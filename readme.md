# PizzaAPI

PizzaAPI, pizza siparişleri, kullanıcı yönetimi, pizza ve topping (malzeme) yönetimi gibi işlemleri gerçekleştiren bir RESTful API'dir. Bu API, pizza siparişlerinin alınması, kullanıcıların yönetilmesi ve malzemelerin eklenmesi gibi temel işlemleri sağlar.

## API Endpoints

Aşağıdaki tabloda, PizzaAPI'nin sunduğu ana API endpointlerini ve her birinin işlevini bulabilirsiniz. Endpointler, kullanıcı doğrulaması, pizza ve topping yönetimi gibi bir dizi işlemi gerçekleştirir.

| Endpoint         | Açıklama                                  |
| ---------------- | ----------------------------------------- |
| `/auth/login`    | Kullanıcı kimlik doğrulama işlemleri.     |
| `/auth/register` | Yeni kullanıcı kaydı oluşturma işlemleri. |
| `/user`          | Kullanıcı işlemleri.                      |
| `/pizza`         | Pizza yönetimi işlemleri.                 |
| `/topping`       | Topping (malzeme) yönetimi işlemleri.     |
| `/order`         | Sipariş işlemleri ve yönetimi.            |
| `/documents`     | API dökümanı.                             |

## Kullanım

### Giriş

Kullanıcı girişi yapmak için `/auth/login` endpoint'ini kullanarak bir JWT token alabilirsiniz. Token, API'ye yapılacak diğer isteklerde doğrulama için gereklidir.

### Kayıt

Yeni bir kullanıcı oluşturmak için `/auth/register` endpoint'ine POST isteği gönderilebilir. Bu işlem başarılı olduğunda, kullanıcı veritabanına kaydedilir.

### Pizza Yönetimi

Pizza verileri, sistemdeki tüm pizzaların listelenmesi ve yeni pizza eklenmesi işlemleri için kullanılır.

### Topping (Malzeme) Yönetimi

Topping (malzeme) verileri, mevcut malzeme seçeneklerinin yönetimi ve yeni malzeme eklemeye imkan verir.

### Sipariş Yönetimi

Siparişler, kullanıcılar tarafından yapılan siparişlerin takibi için kullanılır. Siparişlerin alınması ve listelenmesi işlemleri bu endpoint ile yapılır.
