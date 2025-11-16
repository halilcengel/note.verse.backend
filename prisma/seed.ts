import * as bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
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
  
  // Create Computer Engineering Department
  const department = await prisma.department.create({
    data: {
      name: 'Computer Engineering',
    },
  });

  // Create Admin
  await prisma.user.create({
    data: {
      email: 'admin@university.edu.tr',
      name: 'System Administrator',
      role: 'admin',
      password: hashedPassword,
      tcNo: '12345678901',
    },
  });

  // Create Teachers
  const teachers = await Promise.all([
    prisma.teacher.create({
      data: {
        title: 'Prof. Dr.',
        officeNumber: 'B-301',
        phone: '+90 232 123 4501',
        department: { connect: { id: department.id } },
        user: {
          create: {
            email: 'ahmet.yilmaz@university.edu.tr',
            name: 'Prof. Dr. Ahmet Yılmaz',
            role: 'teacher',
            password: hashedPassword,
            tcNo: '11111111111',
          },
        },
      },
    }),
    prisma.teacher.create({
      data: {
        title: 'Doç. Dr.',
        officeNumber: 'B-302',
        phone: '+90 232 123 4502',
        department: { connect: { id: department.id } },
        user: {
          create: {
            email: 'ayse.demir@university.edu.tr',
            name: 'Doç. Dr. Ayşe Demir',
            role: 'teacher',
            password: hashedPassword,
            tcNo: '22222222222',
          },
        },
      },
    }),
    prisma.teacher.create({
      data: {
        title: 'Dr. Öğr. Üyesi',
        officeNumber: 'B-303',
        phone: '+90 232 123 4503',
        department: { connect: { id: department.id } },
        user: {
          create: {
            email: 'mehmet.kaya@university.edu.tr',
            name: 'Dr. Mehmet Kaya',
            role: 'teacher',
            password: hashedPassword,
            tcNo: '33333333333',
          },
        },
      },
    }),
  ]);

  // Create Halil Çengel - 3rd Year Student
  const halil = await prisma.student.create({
    data: {
      studentNumber: '210603010',
      enrollmentYear: 2021,
      gpa: 3.12,
      user: {
        create: {
          email: 'halil@bakircay.edu.tr',
          name: 'Halil Çengel',
          role: 'student',
          password: hashedPassword,
          tcNo: '27826173466',
        },
      },
    },
  });

  // Create Courses (1st, 2nd, and 3rd year courses)
  const courses = await Promise.all([
    // 1st Year Courses
    prisma.course.create({
      data: {
        code: 'CSE101',
        name: 'Introduction to Programming',
        credits: 4,
        department: { connect: { id: department.id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'CSE102',
        name: 'Programming II',
        credits: 4,
        department: { connect: { id: department.id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'MATH101',
        name: 'Calculus I',
        credits: 4,
        department: { connect: { id: department.id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'MATH102',
        name: 'Calculus II',
        credits: 4,
        department: { connect: { id: department.id } },
      },
    }),
    // 2nd Year Courses
    prisma.course.create({
      data: {
        code: 'CSE201',
        name: 'Data Structures',
        credits: 4,
        department: { connect: { id: department.id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'CSE202',
        name: 'Object Oriented Programming',
        credits: 4,
        department: { connect: { id: department.id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'CSE211',
        name: 'Computer Organization',
        credits: 3,
        department: { connect: { id: department.id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'CSE221',
        name: 'Algorithm Analysis',
        credits: 3,
        department: { connect: { id: department.id } },
      },
    }),
    // 3rd Year Courses
    prisma.course.create({
      data: {
        code: 'CSE301',
        name: 'Database Systems',
        credits: 3,
        department: { connect: { id: department.id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'CSE302',
        name: 'Operating Systems',
        credits: 4,
        department: { connect: { id: department.id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'CSE311',
        name: 'Software Engineering',
        credits: 3,
        department: { connect: { id: department.id } },
      },
    }),
    prisma.course.create({
      data: {
        code: 'CSE321',
        name: 'Computer Networks',
        credits: 3,
        department: { connect: { id: department.id } },
      },
    }),
  ]);

  // Create Course Offerings
  const courseOfferings = await Promise.all([
    // Past Courses - 2023-2024 (1st Year)
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[0].id } }, // CSE101
        teacher: { connect: { id: teachers[0].id } },
        semester: 'Fall',
        academicYear: '2023-2024',
        quota: 50,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[1].id } }, // CSE102
        teacher: { connect: { id: teachers[0].id } },
        semester: 'Spring',
        academicYear: '2023-2024',
        quota: 50,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[2].id } }, // MATH101
        teacher: { connect: { id: teachers[1].id } },
        semester: 'Fall',
        academicYear: '2023-2024',
        quota: 60,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[3].id } }, // MATH102
        teacher: { connect: { id: teachers[1].id } },
        semester: 'Spring',
        academicYear: '2023-2024',
        quota: 60,
      },
    }),
    // Past Courses - 2024-2025 (2nd Year)
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[4].id } }, // CSE201
        teacher: { connect: { id: teachers[1].id } },
        semester: 'Fall',
        academicYear: '2022-2023',
        quota: 45,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[5].id } }, // CSE202
        teacher: { connect: { id: teachers[0].id } },
        semester: 'Spring',
        academicYear: '2024-2025',
        quota: 45,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[6].id } }, // CSE211
        teacher: { connect: { id: teachers[2].id } },
        semester: 'Fall',
        academicYear: '2024-2025',
        quota: 40,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[7].id } }, // CSE221
        teacher: { connect: { id: teachers[2].id } },
        semester: 'Spring',
        academicYear: '2024-2025',
        quota: 40,
      },
    }),
    // Current Courses - 2025-2026 (3rd Year - Fall)
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[8].id } }, // CSE301
        teacher: { connect: { id: teachers[0].id } },
        semester: 'Fall',
        academicYear: '2025-2026',
        quota: 35,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[9].id } }, // CSE302
        teacher: { connect: { id: teachers[1].id } },
        semester: 'Fall',
        academicYear: '2025-2026',
        quota: 35,
      },
    }),
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[10].id } }, // CSE311
        teacher: { connect: { id: teachers[2].id } },
        semester: 'Spring',
        academicYear: '2023-2024',
        quota: 30,
      },
    }),
    // Current Courses - 2025-2026 (3rd Year - Spring)
    prisma.courseOffering.create({
      data: {
        course: { connect: { id: courses[11].id } }, // CSE321
        teacher: { connect: { id: teachers[1].id } },
        semester: 'Spring',
        academicYear: '2024-2025',
        quota: 30,
      },
    }),
  ]);

  // Create Schedules for Current Courses
  await Promise.all([
    // CSE301 Schedule
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[8].id } },
        dayOfWeek: 'Monday',
        startTime: '09:00',
        endTime: '11:50',
        classroom: 'B-101',
      },
    }),
    // CSE302 Schedule
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[9].id } },
        dayOfWeek: 'Tuesday',
        startTime: '09:00',
        endTime: '10:50',
        classroom: 'B-102',
      },
    }),
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[9].id } },
        dayOfWeek: 'Thursday',
        startTime: '09:00',
        endTime: '10:50',
        classroom: 'B-102',
      },
    }),
    // CSE311 Schedule
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[10].id } },
        dayOfWeek: 'Wednesday',
        startTime: '13:00',
        endTime: '15:50',
        classroom: 'B-103',
      },
    }),
    // CSE321 Schedule
    prisma.schedule.create({
      data: {
        courseOffering: { connect: { id: courseOfferings[11].id } },
        dayOfWeek: 'Friday',
        startTime: '11:00',
        endTime: '13:50',
        classroom: 'B-104',
      },
    }),
  ]);

  // Create Enrollments for Halil
  const enrollments = await Promise.all([
    // 1st Year - Completed
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[0].id } },
        status: 'completed',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[1].id } },
        status: 'completed',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[2].id } },
        status: 'completed',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[3].id } },
        status: 'completed',
      },
    }),
    // 2nd Year - Completed
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[4].id } },
        status: 'completed',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[5].id } },
        status: 'completed',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[6].id } },
        status: 'completed',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[7].id } },
        status: 'completed',
      },
    }),
    // 3rd Year Fall - Completed
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[8].id } },
        status: 'completed',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[9].id } },
        status: 'completed',
      },
    }),
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[10].id } },
        status: 'completed',
      },
    }),
    // 3rd Year Spring - Current
    prisma.enrollment.create({
      data: {
        student: { connect: { id: halil.id } },
        courseOffering: { connect: { id: courseOfferings[11].id } },
        status: 'active',
      },
    }),
  ]);

  // Create Grades
  await Promise.all([
    // 1st Year Grades
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[0].id } },
        midtermScore: 75,
        finalScore: 80,
        attendancePercentage: 90,
        letterGrade: 'BB',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[1].id } },
        midtermScore: 82,
        finalScore: 85,
        attendancePercentage: 92,
        letterGrade: 'BA',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[2].id } },
        midtermScore: 70,
        finalScore: 72,
        attendancePercentage: 85,
        letterGrade: 'CB',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[3].id } },
        midtermScore: 78,
        finalScore: 81,
        attendancePercentage: 88,
        letterGrade: 'BB',
      },
    }),
    // 2nd Year Grades
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[4].id } },
        midtermScore: 88,
        finalScore: 90,
        attendancePercentage: 95,
        letterGrade: 'AA',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[5].id } },
        midtermScore: 85,
        finalScore: 87,
        attendancePercentage: 93,
        letterGrade: 'BA',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[6].id } },
        midtermScore: 76,
        finalScore: 79,
        attendancePercentage: 90,
        letterGrade: 'BB',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[7].id } },
        midtermScore: 81,
        finalScore: 84,
        attendancePercentage: 91,
        letterGrade: 'BA',
      },
    }),
    // 3rd Year Fall Grades (Completed)
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[8].id } },
        midtermScore: 92,
        finalScore: 94,
        attendancePercentage: 98,
        letterGrade: 'AA',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[9].id } },
        midtermScore: 86,
        finalScore: 88,
        attendancePercentage: 96,
        letterGrade: 'BA',
      },
    }),
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[10].id } },
        midtermScore: 79,
        finalScore: 82,
        attendancePercentage: 94,
        letterGrade: 'BB',
      },
    }),
    // 3rd Year Spring (Current - Only midterm)
    prisma.grade.create({
      data: {
        enrollment: { connect: { id: enrollments[11].id } },
        midtermScore: 87,
        attendancePercentage: 100,
        letterGrade: null,
      },
    }),
  ]);

  // Create Sample Documents
  const sampleDocumentContent = Buffer.from(
    'Sample syllabus content for the course.',
    'utf-8'
  );

  await Promise.all([
    prisma.document.create({
      data: {
        fileName: 'CSE301_Syllabus.pdf',
        fileData: sampleDocumentContent,
        department: { connect: { id: department.id } },
        teacher: { connect: { id: teachers[0].id } },
      },
    }),
    prisma.document.create({
      data: {
        fileName: 'CSE321_Lecture_Notes.pdf',
        fileData: sampleDocumentContent,
        department: { connect: { id: department.id } },
        teacher: { connect: { id: teachers[1].id } },
      },
    }),
    prisma.document.create({
      data: {
        fileName: 'Department_Handbook_2024.pdf',
        fileData: sampleDocumentContent,
        department: { connect: { id: department.id } },
      },
    }),
  ]);

  console.log('✅ Seed completed successfully!');
  console.log('');
  console.log('📝 Login credentials:');
  console.log('   Admin: admin@university.edu.tr / password123');
  console.log('   Teacher: ahmet.yilmaz@university.edu.tr / password123');
  console.log('   Student: halil@bakircay.edu.tr / password123');
  console.log('');
  console.log('📊 Database summary:');
  console.log(`   - 1 department (Computer Engineering)`);
  console.log(`   - 3 teachers`);
  console.log(`   - 1 student (Halil Çengel - 3rd Year)`);
  console.log(`   - 12 courses (1st, 2nd, and 3rd year)`);
  console.log(`   - ${courseOfferings.length} course offerings`);
  console.log(`   - ${enrollments.length} enrollments`);
  console.log('');
  console.log('📚 Halil\'s Academic Journey:');
  console.log('   - 2021-2022: 1st Year (4 courses completed)');
  console.log('   - 2022-2023: 2nd Year (4 courses completed)');
  console.log('   - 2023-2024 Fall: 3rd Year (3 courses completed)');
  console.log('   - 2024-2025 Spring: 3rd Year (1 course active)');
  console.log(`   - Current GPA: 3.12`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });