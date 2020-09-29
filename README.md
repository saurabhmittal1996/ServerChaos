# prod_project

1)sudo yum install -y python36u python36u-libs python36u-devel python36u-pip


if the above gives error do this 
sudo yum install -y https://repo.ius.io/ius-release-el7.rpm

sudo yum update

sudo yum install -y python36u python36u-libs python36u-devel python36u-pip



2)python3.6  (should work )

3)python3 -m venv env_prod

$)wget http://www6.atomicorp.com/channels/atomic/centos/7/x86_64/RPMS/atomic-sqlite-sqlite-3.8.5-3.el7.art.x86_64.rpm

5)sudo yum localinstall atomic-sqlite-sqlite-3.8.5-3.el7.art.x86_64.rpm

6)sudo mv /lib64/libsqlite3.so.0.8.6{,-3.17}

7)sudo cp /opt/atomic/atomic-sqlite/root/usr/lib64/libsqlite3.so.0.8.6 /lib64

8)source env_prod/bin/activate

9)pip install "django>=3.0,<4"

10)pip install django-rest-framework

11)git clone https://github.com/muskannechlani/prod_project/

12)python manage.py migrate

13)python manage.py runserver
