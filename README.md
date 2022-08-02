# idaproject

[Ссылка на публикацию](https://senior-pomidor.github.io/idaproject/).    

[Макет](https://www.figma.com/file/kIuVw6nSk218pi9iE98iq5/Junior-frontend-developer-test).    

**Node.js ***v14.15.0*****

Данные получаются из mockup.json    
Данные хранятся и изменяются только во Vuex, при обновлении страницы будут откатываться к дефолтному состоянию    
Для взаимодействия с серверным API нужно переписать Vuex методы (можно использовать https://fakestoreapi.com/docs)    

### Уровень 1 (done):    
Верстка на Vue с использованием CSS Modules    
Верстка PixelPerfect (спасибо за ровный макет)    
Отличие на часть пикселя в цене карточки обусловлено дробным значением line-height в макете.    

### Уровень 2 (done):    
- Валидация на заполнение (required)    
- Валидация на числовые значения в поле "цена"    
- Валидация на URL в поле "Ссылка на изображение товара"    
- Активация кнопки у валидной формы    
- Маска разделения разрядов пробелом в поле "цена"    
- Добавление карточек товаров    
- Анимация добавления новой карточки товара    

### 3 уровень (done):   
- Удаление карточек товаров
- Сортировка по возрастанию цены
- Сортировка по убыванию цены
- Сортировка по наименованию

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
