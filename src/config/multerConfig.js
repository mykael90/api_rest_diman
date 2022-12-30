import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = {
  image: (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length'], 10);
    // 5mb
    if (fileSize > 10 * 1024 * 1024) return cb(new multer.MulterError('Tamanho do arquivo precisa ser inferior a 10 mb'));
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
      return cb(new multer.MulterError('Arquivo precisa ser do tipo PNG ou JPG/JPEG'));
    }
    return cb(null, true);
  },

  pdf: (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length'], 10);
    // 5mb
    if (fileSize > 5 * 1024 * 1024) return cb(new multer.MulterError('Tamanho do arquivo precisa ser inferior a 5 mb'));
    if (file.mimetype !== 'application/pdf') {
      return cb(new multer.MulterError('Arquivo precisa ser do tipo PDF'));
    }
    return cb(null, true);
  },

  pdfOrImage: (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length'], 10);
    // 5mb
    if (fileSize > 5 * 1024 * 1024) return cb(new multer.MulterError('Tamanho do arquivo precisa ser inferior a 5 mb'));
    if (file.mimetype !== 'application/pdf' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
      return cb(new multer.MulterError('Arquivo precisa ser do tipo PDF, PNG ou JPG/JPEG'));
    }
    return cb(null, true);
  },
};

const config = {
  image: {
    storage,
    fileFilter: fileFilter.image,
  },
  pdf: {
    fileFilter: fileFilter.pdf,
    storage,
  },
};

// Single files
const uploadPhotoMemory = multer(config.image).single('photo');
const uploadPdfMemory = multer(config.pdf).single('pdf');

const photoMulter = (req, res, next) => {
  uploadPhotoMemory(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(JSON.stringify(err));
      return res.status(400).json({
        errors: [err.code],
      });
    } if (err) {
      // An unknown error occurred when uploading.
      console.log(JSON.stringify(err));
      return res.status(400).json({
        errors: [err.message],
      });
    }

    // Everything went fine.
    return next();
  });
};

const pdfMulter = (req, res, next) => {
  uploadPdfMemory(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(JSON.stringify(err));
      return res.status(400).json({
        errors: [err.code],
      });
    } if (err) {
      // An unknown error occurred when uploading.
      console.log(JSON.stringify(err));
      return res.status(400).json({
        errors: [err.message],
      });
    }

    // Everything went fine.
    return next();
  });
};

// Multiple files
const uploadPhotoArrayMemory = multer(config.image).array('photos');
const uploadPdfArrayMemory = multer(config.image).array('pdfs');

const photoArrayMulter = (req, res, next) => {
  uploadPhotoArrayMemory(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(JSON.stringify(err));
      return res.status(400).json({
        errors: [err.code],
      });
    } if (err) {
      // An unknown error occurred when uploading.
      console.log(JSON.stringify(err));
      return res.status(400).json({
        errors: [err.message],
      });
    }

    // Everything went fine.
    return next();
  });
};

const pdfArrayMulter = (req, res, next) => {
  uploadPdfArrayMemory(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(JSON.stringify(err));
      return res.status(400).json({
        errors: [err.code],
      });
    } if (err) {
      // An unknown error occurred when uploading.
      console.log(JSON.stringify(err));
      return res.status(400).json({
        errors: [err.message],
      });
    }

    // Everything went fine.
    return next();
  });
};

export {
  photoMulter, pdfMulter, photoArrayMulter, pdfArrayMulter,
};
