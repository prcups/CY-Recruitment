# cy_recruitment

#### 部署说明：

1.新建数据库db_cy_rc，在settings.py中修改密码。

2.后端依赖以下包：
- django
- simplejson
- aliyun-python-sdk-core-v3
- django-core-headers

3.前端运行npm run build，将dist移至nginx根目录。后端自行配置uwsgi与nginx。