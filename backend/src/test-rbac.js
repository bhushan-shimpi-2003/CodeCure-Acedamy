/**
 * RBAC Test Script — Tests signup, login, and role-based access
 * Run: node src/test-rbac.js
 */

const supabase = require('./config/supabaseClient');

const API = 'http://localhost:5000/api';

async function request(method, path, body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API}${path}`, options);
  const data = await res.json();
  return { status: res.status, data };
}

async function createTestUser(email, password, name, role) {
  // Use Supabase Admin API to create user (bypasses email verification)
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, role },
  });

  if (error) {
    // User might already exist — try to sign in instead
    if (error.message.includes('already been registered')) {
      console.log(`  ⚠️  ${email} already exists, will login instead`);
      return null;
    }
    console.error(`  ❌ Failed to create ${email}:`, error.message);
    return null;
  }

  console.log(`  ✅ Created ${role}: ${email} (ID: ${data.user.id})`);
  return data.user;
}

async function loginUser(email, password) {
  const result = await request('POST', '/auth/login', { email, password });
  if (result.data.success) {
    console.log(`  ✅ Login OK — Role: ${result.data.data.user.role}`);
    return result.data.data.session.access_token;
  } else {
    console.error(`  ❌ Login failed:`, result.data.error);
    return null;
  }
}

async function testAccess(label, method, path, token, expectedStatus) {
  const result = await request(method, path, null, token);
  const passed = result.status === expectedStatus;
  const icon = passed ? '✅' : '❌';
  console.log(`  ${icon} ${label} — Status: ${result.status} (expected ${expectedStatus})${!passed ? ' — ' + JSON.stringify(result.data.error) : ''}`);
  return passed;
}

async function main() {
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║   CODECURE ACADEMY — RBAC TEST SUITE         ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  // ── Step 1: Create test users ──
  console.log('📦 STEP 1: Creating Test Users via Supabase Admin API...');
  await createTestUser('student@test.com', 'Password123!', 'Test Student', 'student');
  await createTestUser('teacher@test.com', 'Password123!', 'Test Teacher', 'teacher');
  await createTestUser('admin@test.com', 'Password123!', 'Test Admin', 'admin');

  // ── Step 2: Login as each role ──
  console.log('\n🔐 STEP 2: Login & Token Retrieval...');

  console.log('\n  [Student]');
  const studentToken = await loginUser('student@test.com', 'Password123!');

  console.log('\n  [Teacher]');
  const teacherToken = await loginUser('teacher@test.com', 'Password123!');

  console.log('\n  [Admin]');
  const adminToken = await loginUser('admin@test.com', 'Password123!');

  if (!studentToken || !teacherToken || !adminToken) {
    console.log('\n❌ Cannot proceed — one or more logins failed.');
    process.exit(1);
  }

  // ── Step 3: Test /auth/me ──
  console.log('\n👤 STEP 3: GET /api/auth/me (all roles should get 200)...');
  await testAccess('Student → /auth/me', 'GET', '/auth/me', studentToken, 200);
  await testAccess('Teacher → /auth/me', 'GET', '/auth/me', teacherToken, 200);
  await testAccess('Admin   → /auth/me', 'GET', '/auth/me', adminToken, 200);

  // ── Step 4: Test RBAC — Admin-only routes ──
  console.log('\n🛡️  STEP 4: RBAC — Admin-only routes (GET /api/admin/students)...');
  await testAccess('Student → /admin/students', 'GET', '/admin/students', studentToken, 403);
  await testAccess('Teacher → /admin/students', 'GET', '/admin/students', teacherToken, 403);
  await testAccess('Admin   → /admin/students', 'GET', '/admin/students', adminToken, 200);

  // ── Step 5: Test RBAC — Teacher-only routes ──
  console.log('\n🛡️  STEP 5: RBAC — Teacher/Admin routes (GET /api/courses/teacher/my)...');
  await testAccess('Student → /courses/teacher/my', 'GET', '/courses/teacher/my', studentToken, 403);
  await testAccess('Teacher → /courses/teacher/my', 'GET', '/courses/teacher/my', teacherToken, 200);
  await testAccess('Admin   → /courses/teacher/my', 'GET', '/courses/teacher/my', adminToken, 200);

  // ── Step 6: Test RBAC — Student-only routes ──
  console.log('\n🛡️  STEP 6: RBAC — Student-only routes (GET /api/doubts/me)...');
  await testAccess('Student → /doubts/me', 'GET', '/doubts/me', studentToken, 200);
  await testAccess('Teacher → /doubts/me', 'GET', '/doubts/me', teacherToken, 403);
  await testAccess('Admin   → /doubts/me', 'GET', '/doubts/me', adminToken, 403);

  // ── Step 7: No token ──
  console.log('\n🔒 STEP 7: No Token (should get 401)...');
  await testAccess('No token → /auth/me', 'GET', '/auth/me', null, 401);
  await testAccess('No token → /admin/students', 'GET', '/admin/students', null, 401);

  console.log('\n✨ RBAC Test Suite Complete!\n');
}

main().catch(console.error);
