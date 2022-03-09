# Library Case Api

#### Açıklama
Bir kütüphane için, üyeleri ve kitapların üyeler tarafından ödünç alınması işlemlerini yönetebilmek için geliştirilmiş API.

Uygulamanın üzerinden yapılabilecek işlemler aşağıda listelenmiştir:
- Kullanıcıları listeleme
- Bir kullanıcının bilgilerine erişme (ismi, geçmişte ödünç aldığı kitaplar ve mevcut ödünç
aldığı kitaplar)
- Yeni kullanıcı oluşturma
- Kitapları listeleme
- Bir kitabın bilgilerine erişme (ismi ve ortalama değerlendirme puanı)
- Yeni kitap oluşturma
- Kitap ödünç alma
- Kitap teslim etme ve değerlendirme puanı verme

Kullanılan Teknolojiler
- TypeScript  
- Express.js
- TypeORM 
- MySQL 
- TypeScript Express

#### Çalıştırma
Paketilerin kurulumu ve uygulama çalıştırılması:

```sh
npm install
```
```sh
npm start
```

#### Proje Oluşturulma Aşamaları

npm paketlerinin indirilmesi
```sh
npm install typeorm --save
```
```sh
npm install reflect-metadata --save
```
```sh
npm install @types/node --save-dev
```

mySql Kurulumu
```sh
npm install mysql --save
```

Typeorm - express kurulumu ve proje oluşturulması
```sh
typeorm init --name LibraryCaseApi --database mysql --express
```

`ormconfig.json` dosyasını düzenleyip kendi veritabanı bilgilerimizi ekliyoruz.
```sh
{
   "type": "mysql",
   "host": "127.0.0.1",
   "port": 3306,
   "username": "root",
   "password": "",
   "database": "librarycase",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ]
}
```

Paketilerin kurulumu ve uygulama çalıştırılması:

```sh
npm install
```
```sh
npm start
```

#### Kaynak 
- [TypeORM](https://typeorm.io/#/) - Proje oluşturma aşamaları
- [TypeORM - Relations](https://typeorm.io/#/many-to-one-one-to-many-relations) - Many to One - One to Many İlişki oluşturma aşamaları
- [TypeScript Express Tutorial](https://wanago.io/2018/12/17/typescript-express-error-handling-validation/) - Error handling ve validasyon işlemleri






