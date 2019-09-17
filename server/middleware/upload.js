const path = require('path');
// библиотека для загрузки файлов
const multer = require('multer');
// npm i moment
const moment = require('moment');

// мидлва в котором указаны настройки для сохранения файлов в хронилище
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // null - первым аргументом идет параметер ошибки
    // вторым параметром путь, куда сохраниться файл
    cb(null, path.resolve(__dirname, '../../', 'static'))
  },
  // функция что генерирует название сохраняемого файла
  filename(req, file, cb) {
    cb(null, `${moment().format('DDMMYYYY-HHmmss_SSS')}-${file.originalname}`)
  }
});

// функция валидирующая файлы
const fileFilter = (req, file, cb) => {
  if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
    // true - говорит что файл валидный и можно сохранять
    cb(null, true)
  } else {
    cb(null, false);
    console.error('fileFilter filtered file (unresolved format)!');
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }
});
