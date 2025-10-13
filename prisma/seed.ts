import * as bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.grade.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.courseOffering.deleteMany();
  await prisma.course.deleteMany();
  await prisma.document.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();


  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        name: 'Computer Engineering',
      },
    }),
    prisma.department.create({
      data: {
        name: 'Electrical Engineering',
      },
    }),
    prisma.department.create({
      data: {
        name: 'Mathematics',
      },
    }),
    prisma.department.create({
      data: {
        name: 'Physics',
      },
    }),
  ]);

  
  await prisma.user.create({
    data: {
      email: 'admin@university.edu.tr',
      name: 'System Administrator',
      role: 'admin',
      password: hashedPassword,
      tcNo: '12345678901',
    },
  });

  
  const teachersData = [
    {
      email: 'ahmet.yilmaz@university.edu.tr',
      name: 'Prof. Dr. Ahmet Yılmaz',
      tcNo: '11111111111',
      title: 'Prof. Dr.',
      department: departments[0], // Computer Engineering
      officeNumber: 'B-301',
      phone: '+90 232 123 4501',
    },
    {
      email: 'ayse.demir@university.edu.tr',
      name: 'Doç. Dr. Ayşe Demir',
      tcNo: '22222222222',
      title: 'Doç. Dr.',
      department: departments[0], // Computer Engineering
      officeNumber: 'B-302',
      phone: '+90 232 123 4502',
    },
    {
      email: 'mehmet.kaya@university.edu.tr',
      name: 'Dr. Mehmet Kaya',
      tcNo: '33333333333',
      title: 'Dr. Öğr. Üyesi',
      department: departments[1], // Electrical Engineering
      officeNumber: 'C-201',
      phone: '+90 232 123 4503',
    },
    {
      email: 'fatma.ozturk@university.edu.tr',
      name: 'Prof. Dr. Fatma Öztürk',
      tcNo: '44444444444',
      title: 'Prof. Dr.',
      department: departments[2], // Mathematics
      officeNumber: 'A-401',
      phone: '+90 232 123 4504',
    },
    {
      email: 'ali.celik@university.edu.tr',
      name: 'Doç. Dr. Ali Çelik',
      tcNo: '55555555555',
      title: 'Doç. Dr.',
      department: departments[3], // Physics
      officeNumber: 'D-101',
      phone: '+90 232 123 4505',
    },
  ];

  const teachers = [];
  for (const teacherData of teachersData) {
    const teacher = await prisma.teacher.create({
      data: {
        title: teacherData.title,
        officeNumber: teacherData.officeNumber,
        phone: teacherData.phone,
        department: {
          connect: { id: teacherData.department.id },
        },
        user: {
          create: {
            email: teacherData.email,
            name: teacherData.name,
            role: 'teacher',
            password: hashedPassword,
            tcNo: teacherData.tcNo,
          },
        },
      },
    });
    teachers.push(teacher);
  }
  
  const studentsData = [
    {
      email: 'can.yildirim@student.edu.tr',
      name: 'Can Yıldırım',
      tcNo: '66666666666',
      studentNumber: '20210001',
      enrollmentYear: 2021,
      gpa: 3.45,
    },
    {
      email: 'zeynep.arslan@student.edu.tr',
      name: 'Zeynep Arslan',
      tcNo: '77777777777',
      studentNumber: '20210002',
      enrollmentYear: 2021,
      gpa: 3.78,
    },
    {
      email: 'burak.sahin@student.edu.tr',
      name: 'Burak Şahin',
      tcNo: '88888888888',
      studentNumber: '20220001',
      enrollmentYear: 2022,
      gpa: 3.21,
    },
    {
      email: 'elif.kurt@student.edu.tr',
      name: 'Elif Kurt',
      tcNo: '99999999999',
      studentNumber: '20220002',
      enrollmentYear: 2022,
      gpa: 3.92,
    },
    {
      email: 'emre.polat@student.edu.tr',
      name: 'Emre Polat',
      tcNo: '10101010101',
      studentNumber: '20230001',
      enrollmentYear: 2023,
      gpa: 3.56,
    },
    {
      email: 'selin.acar@student.edu.tr',
      name: 'Selin Acar',
      tcNo: '20202020202',
      studentNumber: '20230002',
      enrollmentYear: 2023,
      gpa: 3.64,
    },
    {
      email: 'deniz.yilmaz@student.edu.tr',
      name: 'Deniz Yılmaz',
      tcNo: '30303030303',
      studentNumber: '20240001',
      enrollmentYear: 2024,
      gpa: 0.0,
    },
    {
      email: 'nur.koc@student.edu.tr',
      name: 'Nur Koç',
      tcNo: '40404040404',
      studentNumber: '20240002',
      enrollmentYear: 2024,
      gpa: 0.0,
    },
  ];

  const students = [];
  for (const studentData of studentsData) {
    const student = await prisma.student.create({
      data: {
        studentNumber: studentData.studentNumber,
        enrollmentYear: studentData.enrollmentYear,
        gpa: studentData.gpa,
        user: {
          create: {
            email: studentData.email,
            name: studentData.name,
            role: 'student',
            password: hashedPassword,
            tcNo: studentData.tcNo,
          },
        },
      },
    });
    students.push(student);
  }


  const courses = await Promise.all([
    // Computer Engineering Courses
    prisma.course.create({
      data: {
        code: 'CSE101',
        name: 'Introduction to Programming',
        credits: 4,
        department: { connect: { id: departments[0].id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'CSE201',
        name: 'Data Structures',
        credits: 4,
        department: { connect: { id: departments[0].id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'CSE301',
        name: 'Database Systems',
        credits: 3,
        department: { connect: { id: departments[0].id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'CSE401',
        name: 'Artificial Intelligence',
        credits: 3,
        department: { connect: { id: departments[0].id } },
      },
    }),
    // Electrical Engineering Courses
    prisma.course.create({
      data: {
        code: 'EE101',
        name: 'Circuit Analysis',
        credits: 4,
        department: { connect: { id: departments[1].id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'EE201',
        name: 'Electronics',
        credits: 4,
        department: { connect: { id: departments[1].id } },
      },
    }),
    // Mathematics Courses
    prisma.course.create({
      data: {
        code: 'MATH101',
        name: 'Calculus I',
        credits: 4,
        department: { connect: { id: departments[2].id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'MATH201',
        name: 'Linear Algebra',
        credits: 3,
        department: { connect: { id: departments[2].id } },
      },
    }),
    // Physics Courses
    prisma.course.create({
      data: {
        code: 'PHYS101',
        name: 'Physics I',
        credits: 4,
        department: { connect: { id: departments[3].id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'PHYS201',
        name: 'Physics II',
        credits: 4,
        department: { connect: { id: departments[3].id } },
      },
    }),
  ]);
  
  const courseOfferings = await Promise.all([
    // Fall 2024 Offerings
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[0].id } }, // CSE101
        teacher: { connect: { id: teachers[0].id } },
        semester: 'Fall',
        academicYear: '2024-2025',
        quota: 50,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[1].id } }, // CSE201
        teacher: { connect: { id: teachers[1].id } },
        semester: 'Fall',
        academicYear: '2024-2025',
        quota: 40,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[2].id } }, // CSE301
        teacher: { connect: { id: teachers[0].id } },
        semester: 'Fall',
        academicYear: '2024-2025',
        quota: 35,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[4].id } }, // EE101
        teacher: { connect: { id: teachers[2].id } },
        semester: 'Fall',
        academicYear: '2024-2025',
        quota: 45,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[6].id } }, // MATH101
        teacher: { connect: { id: teachers[3].id } },
        semester: 'Fall',
        academicYear: '2024-2025',
        quota: 60,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[8].id } }, // PHYS101
        teacher: { connect: { id: teachers[4].id } },
        semester: 'Fall',
        academicYear: '2024-2025',
        quota: 55,
      },
    }),
    // Spring 2025 Offerings
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[3].id } }, // CSE401
        teacher: { connect: { id: teachers[1].id } },
        semester: 'Spring',
        academicYear: '2024-2025',
        quota: 30,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[5].id } }, // EE201
        teacher: { connect: { id: teachers[2].id } },
        semester: 'Spring',
        academicYear: '2024-2025',
        quota: 40,
      },
    }),
  ]);

  
  await Promise.all([
    // CSE101 Schedule
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[0].id } },
        dayOfWeek: 'Monday',
        startTime: '09:00',
        endTime: '10:50',
        classroom: 'B-101',
      },
    }),
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[0].id } },
        dayOfWeek: 'Wednesday',
        startTime: '09:00',
        endTime: '10:50',
        classroom: 'B-101',
      },
    }),
    // CSE201 Schedule
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[1].id } },
        dayOfWeek: 'Tuesday',
        startTime: '11:00',
        endTime: '12:50',
        classroom: 'B-102',
      },
    }),
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[1].id } },
        dayOfWeek: 'Thursday',
        startTime: '11:00',
        endTime: '12:50',
        classroom: 'B-102',
      },
    }),
    // CSE301 Schedule
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[2].id } },
        dayOfWeek: 'Monday',
        startTime: '13:00',
        endTime: '15:50',
        classroom: 'B-103',
      },
    }),
    // EE101 Schedule
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[3].id } },
        dayOfWeek: 'Tuesday',
        startTime: '09:00',
        endTime: '10:50',
        classroom: 'C-201',
      },
    }),
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[3].id } },
        dayOfWeek: 'Friday',
        startTime: '09:00',
        endTime: '10:50',
        classroom: 'C-201',
      },
    }),
    // MATH101 Schedule
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[4].id } },
        dayOfWeek: 'Monday',
        startTime: '11:00',
        endTime: '12:50',
        classroom: 'A-301',
      },
    }),
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[4].id } },
        dayOfWeek: 'Wednesday',
        startTime: '11:00',
        endTime: '12:50',
        classroom: 'A-301',
      },
    }),
    // PHYS101 Schedule
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[5].id } },
        dayOfWeek: 'Thursday',
        startTime: '13:00',
        endTime: '14:50',
        classroom: 'D-101',
      },
    }),
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[5].id } },
        dayOfWeek: 'Friday',
        startTime: '13:00',
        endTime: '14:50',
        classroom: 'D-101',
      },
    }),
  ]);

  const enrollments = await Promise.all([
    // Student 1 enrollments
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[0].id } },
        courseOffering: { connect: { id: courseOfferings[0].id } },
        status: 'active',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[0].id } },
        courseOffering: { connect: { id: courseOfferings[1].id } },
        status: 'active',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[0].id } },
        courseOffering: { connect: { id: courseOfferings[4].id } },
        status: 'active',
      },
    }),
    // Student 2 enrollments
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[1].id } },
        courseOffering: { connect: { id: courseOfferings[0].id } },
        status: 'active',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[1].id } },
        courseOffering: { connect: { id: courseOfferings[2].id } },
        status: 'active',
      },
    }),
    // Student 3 enrollments
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[2].id } },
        courseOffering: { connect: { id: courseOfferings[1].id } },
        status: 'active',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[2].id } },
        courseOffering: { connect: { id: courseOfferings[5].id } },
        status: 'completed',
      },
    }),
    // Student 4 enrollments
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[3].id } },
        courseOffering: { connect: { id: courseOfferings[3].id } },
        status: 'active',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[3].id } },
        courseOffering: { connect: { id: courseOfferings[4].id } },
        status: 'active',
      },
    }),
    // Student 5 enrollments
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[4].id } },
        courseOffering: { connect: { id: courseOfferings[0].id } },
        status: 'dropped',
      },
    }),
    // Student 6 enrollments
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[5].id } },
        courseOffering: { connect: { id: courseOfferings[2].id } },
        status: 'active',
      },
    }),
    // Student 7 enrollments (new student, no grades yet)
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[6].id } },
        courseOffering: { connect: { id: courseOfferings[0].id } },
        status: 'active',
      },
    }),
    // Student 8 enrollments
    prisma.enrollment.create({
      data: {
        student: { connect: { id: students[7].id } },
        courseOffering: { connect: { id: courseOfferings[4].id } },
        status: 'active',
      },
    }),
  ]);

  
  await Promise.all([
    // Grades for completed/active courses with scores
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[0].id } },
        midtermScore: 85,
        finalScore: 90,
        attendancePercentage: 95,
        letterGrade: 'AA',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[1].id } },
        midtermScore: 78,
        finalScore: 82,
        attendancePercentage: 90,
        letterGrade: 'BA',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[2].id } },
        midtermScore: 92,
        attendancePercentage: 100,
        letterGrade: null, // Final not yet taken
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[3].id } },
        midtermScore: 88,
        finalScore: 85,
        attendancePercentage: 88,
        letterGrade: 'AA',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[4].id } },
        midtermScore: 95,
        finalScore: 98,
        attendancePercentage: 100,
        letterGrade: 'AA',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[5].id } },
        midtermScore: 72,
        attendancePercentage: 85,
        letterGrade: null,
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[6].id } },
        midtermScore: 80,
        finalScore: 75,
        attendancePercentage: 92,
        letterGrade: 'BB',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[7].id } },
        midtermScore: 91,
        attendancePercentage: 94,
        letterGrade: null,
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[8].id } },
        midtermScore: 89,
        finalScore: 92,
        attendancePercentage: 96,
        letterGrade: 'AA',
      },
    }),
    // Dropped course - no grades
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[9].id } },
        attendancePercentage: 45,
        letterGrade: 'W', // Withdrawn
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[10].id } },
        midtermScore: 86,
        attendancePercentage: 92,
        letterGrade: null,
      },
    }),
    // New student - no grades yet
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[11].id } },
        attendancePercentage: 100,
        letterGrade: null,
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[12].id } },
        attendancePercentage: 98,
        letterGrade: null,
      },
    }),
  ]);

  // Create sample PDF content (simulated)
  const sampleDocumentContent = Buffer.from(
    'Sample syllabus content for the course. This would typically be a PDF file.',
    'utf-8'
  );

  await Promise.all([
    prisma.document.create({
      data: {
        fileName: 'CSE101_Syllabus.pdf',
        fileData: sampleDocumentContent,
        department: { connect: { id: departments[0].id } },
        teacher: { connect: { id: teachers[0].id } },
      },
    }),
    prisma.document.create({
      data: {
        fileName: 'CSE201_Syllabus.pdf',
        fileData: sampleDocumentContent,
        department: { connect: { id: departments[0].id } },
        teacher: { connect: { id: teachers[1].id } },
      },
    }),
    prisma.document.create({
      data: {
        fileName: 'Department_Handbook_2024.pdf',
        fileData: sampleDocumentContent,
        department: { connect: { id: departments[0].id } },
      },
    }),
    prisma.document.create({
      data: {
        fileName: 'EE101_Lab_Manual.pdf',
        fileData: sampleDocumentContent,
        department: { connect: { id: departments[1].id } },
        teacher: { connect: { id: teachers[2].id } },
      },
    }),
    prisma.document.create({
      data: {
        fileName: 'MATH101_Exercise_Solutions.pdf',
        fileData: sampleDocumentContent,
        department: { connect: { id: departments[2].id } },
        teacher: { connect: { id: teachers[3].id } },
      },
    }),
  ]);

  console.log('✅ Seed completed successfully!');
  console.log('');
  console.log('📝 Login credentials:');
  console.log('   Admin: admin@university.edu.tr / password123');
  console.log('   Teacher: ahmet.yilmaz@university.edu.tr / password123');
  console.log('   Student: can.yildirim@student.edu.tr / password123');
  console.log('');
  console.log('📊 Database summary:');
  console.log(`   - ${departments.length} departments`);
  console.log(`   - ${teachers.length} teachers`);
  console.log(`   - ${students.length} students`);
  console.log(`   - ${courses.length} courses`);
  console.log(`   - ${courseOfferings.length} course offerings`);
  console.log(`   - ${enrollments.length} enrollments`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });