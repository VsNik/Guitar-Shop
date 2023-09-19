import * as Yup from 'yup';

export const loginValidateSchema = Yup.object().shape({
  email: Yup.string()
    .required('Заполните поле'),
  password: Yup.string()
    .required('Заполните поле')
});

export const signupValidateSchema = Yup.object().shape({
  name: Yup.string()
    .required('Заполните поле')
    .max(15, 'Максимум 15 символов'),
  email: Yup.string()
    .required('Заполните поле')
    .email('Некоректный Email адрес'),
  password: Yup.string()
    .required('Заполните поле')
    .min(6, 'Минимальная длина 6 символов')
    .max(12, 'Максимальная длина 12 символов')
});

export const productValidateSchema = Yup.object().shape({
  title: Yup.string()
    .required('Заполните поле')
    .min(10, 'Минимальная длинна 10 символов')
    .max(100, 'Максимальная длинна 100 символов'),
  description: Yup.string()
    .required('Заполните поле')
    .min(20, 'Минимальная длинна 20 символов')
    .max(1024, 'Максимальная длинна 1024 символов'),
  price: Yup.number()
    .integer()
    .min(100, 'Минимальная цена 100 р')
    .max(1000000, 'Максимальная цена 1 000 000 р ')
  .required('Заполните поле'),
  ean: Yup.string()
    .required('Заполните поле')
    .min(5, 'Минимальная длинна 5 символов')
    .max(40, 'Максимальная длинна 40 символов'),
  type: Yup.string(),
  stringCount: Yup.string(),
  image: Yup.mixed()
    .test("required", 'Выберите картинку товара', (file) => {
      if (file) {
        return true;
      }
      return false;
    })
})
