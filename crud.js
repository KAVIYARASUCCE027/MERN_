const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'students.json');

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

const readData = () => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


const createStudent = (student) => {
  const students = readData();
  students.push(student);
  writeData(students);
  console.log('Student added successfully:', student);
};

const readStudents = () => {
  const students = readData();
  console.log('Current Students:', students);
  return students;
};

const updateStudent = (id, updatedDetails) => {
  const students = readData();
  const index = students.findIndex(student => student.id === id);

  if (index === -1) {
    console.log(`Student with ID ${id} not found.`);
    return;
  }

  students[index] = { ...students[index], ...updatedDetails };
  writeData(students);
  console.log(`Student with ID ${id} updated successfully.`);
};


const deleteStudent = (id) => {
  const students = readData();
  const updatedStudents = students.filter(student => student.id !== id);

  if (students.length === updatedStudents.length) {
    console.log(`Student with ID ${id} not found.`);
    return;
  }

  writeData(updatedStudents);
  console.log(`Student with ID ${id} deleted successfully.`);
};


createStudent({ id: 1, name: 'deva', age: 20, major: 'Computer Science' });
createStudent({ id: 2, name: 'Sugu', age: 22, major: 'Mathematics' });
readStudents();
updateStudent(1, { age: 21, major: 'Data Science' });
deleteStudent(2);
readStudents();
