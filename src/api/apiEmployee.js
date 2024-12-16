export const generateRandomData = () => {
  const cachedData = localStorage.getItem("employees");
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const maleFirstNames = [
    "Иван",
    "Александр",
    "Сергей",
    "Дмитрий",
    "Андрей",
    "Олег",
    "Михаил",
    "Виктор",
    "Денис",
    "Павел",
  ];

  const femaleFirstNames = [
    "Анна",
    "Мария",
    "Елена",
    "Анастасия",
    "Татьяна",
    "Ольга",
    "Наталья",
    "Ирина",
    "Екатерина",
    "Светлана",
  ];

  const lastNames = [
    "Иванов",
    "Петров",
    "Сидоров",
    "Кузнецов",
    "Смирнов",
    "Попов",
    "Лебедев",
    "Тихонов",
    "Семёнов",
    "Григорьев",
  ];

  const departments = [
    "IT",
    "HR",
    "Финансы",
    "Маркетинг",
    "Продажи",
    "Операции",
    "Научно-исследовательский",
  ];

  const positions = [
    "Разработчик",
    "Менеджер",
    "Аналитик",
    "Дизайнер",
    "Программист",
    "Инженер",
    "Специалист",
  ];

  let data = [];

  for (let i = 0; i < 150; i++) {
    const isMale = Math.random() > 0.5;
    const firstName = isMale
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];

    const lastNameBase =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    const lastName = isMale ? lastNameBase : getFemaleLastName(lastNameBase);
    const fullName = `${firstName} ${lastName}`;
    const birthDate = new Date();
    const age = Math.floor(Math.random() * (65 - 20 + 1) + 20);
    birthDate.setFullYear(birthDate.getFullYear() - age);
    const birthDateString = birthDate.toISOString().slice(0, 10);
    const gender = isMale ? "Мужской" : "Женский";
    const email = `${firstName.toLowerCase()}.${lastNameBase.toLowerCase()}@example.com`;
    const phone = `+7${Math.floor(Math.random() * 9000000000 + 100000000)}`;
    const address = `${Math.floor(Math.random() * 100)} улица ${
      ["Ленина", "Пушкина", "Мира", "Советская"][Math.floor(Math.random() * 4)]
    }, г. Москва`;
    const position = positions[Math.floor(Math.random() * positions.length)];
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    const salary = Math.floor(Math.random() * (200000 - 30000 + 1) + 30000);
    const about = `Я работаю на позиции ${position} в отделе ${department}. Мои навыки включают в себя...`;
    const childrenCount = Math.floor(Math.random() * 6);
    const children = [];
    for (let j = 0; j < childrenCount; j++) {
      const childName = isMale
        ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
        : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
      const childAge = Math.floor(Math.random() * 12);
      children.push({ name: childName, age: childAge });
    }

    const employmentDate = new Date();
    employmentDate.setFullYear(
      employmentDate.getFullYear() - Math.floor(Math.random() * 10)
    );
    const employmentDateString = employmentDate.toISOString().slice(0, 10);
    const experience = new Date().getFullYear() - employmentDate.getFullYear();

    data.push({
      id: i + 1,
      fullName,
      photo: `https://randomuser.me/api/portraits/${
        isMale ? "men" : "women"
      }/${i}.jpg`,
      birthDate: birthDateString,
      age,
      gender,
      email,
      phone,
      address,
      position,
      department,
      salary,
      about,
      employmentDate: employmentDateString,
      experience,
      children,
    });
  }

  localStorage.setItem("employees", JSON.stringify(data));

  return data;
};

const getFemaleLastName = (lastName) => {
  if (lastName.endsWith("ов")) {
    return lastName.slice(0, 8) + "а";
  } else if (lastName.endsWith("ев")) {
    return lastName.slice(0, 8) + "а";
  } else {
    return lastName + "а";
  }
};
