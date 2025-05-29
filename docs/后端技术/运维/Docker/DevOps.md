# DevOps

软件开发：
- 开发团队：从头开始设计和整体系统的构建
- 运维团队：将开发团队的Code进行测试后部署上线，希望系统稳定安全运行

运维团队需要向开发团队反馈需要修复的BUG以及一些需要返工的任务。

两个团队协商，生命周期变长。

——————

现在的互联网现状，更推崇敏捷式开发，这样就导致项目的迭代速度更快，但是由于开发团队与运维团队的沟通问题，会导致新版本上线的时间成本很高，这违背看敏捷式开发最初的目的

让开发团队和运维团队整合成一个团队，协同应对一套软件，这就被称为——DevOps

DevOPs：Development & Operations 的缩写，也就是开发&运维

其实QA测试团队也是参与其中的。

![Alt text](./images/DevOps/image3.png)

DevOps强调的是高效组织团队之间如何通过自动化的工具写作和沟通来完成软件的生命周期管理，从而更快、更频繁的交付更稳定的软件

自动化的工具写作和沟通来完成软件的声明周期管理。


![Alt text](./images/DevOps/image5.png)


## docker && docker-compose --> gitlab安装

CentOS
```bash
yum install docker

docker version

yum install docker-compose

docker-compose version
```

关闭防火墙

```bash
systemctl stop firewalld
```

创建docker目录
```bash
[root@localhost ~]# cd /usr/local/
[root@localhost local]# ls
bin  etc  games  include  lib  lib64  libexec  LICENSE  sbin  share  src
[root@localhost local]# mkdir docker
[root@localhost local]# ls
bin     etc    include  lib64    LICENSE  share
docker  games  lib      libexec  sbin     src
```

docker目录下创建gitlab目录
```bash
[root@localhost docker]# mkdir gitlab_docker
[root@localhost docker]# cd gitlab_docker/
[root@localhost gitlab_docker]# 
```

创建配置文件
```bash
[root@localhost gitlab_docker]# vim docker-compose.yml
```

查看docker状态，启动docker
```bash
[root@localhost gitlab_docker]# systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; disabled; vendor preset: disabled)
   Active: inactive (dead)
     Docs: http://docs.docker.com
[root@localhost gitlab_docker]# systemctl start docker
# 搜索gitlab
[root@localhost gitlab_docker]# docker search gitlab
INDEX       NAME                                               DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
docker.io   docker.io/bitnami/gitlab-runner                                                                    32                   
docker.io   docker.io/drud/gitlab-ce                                                                           18                   
docker.io   docker.io/rapidfort/gitlab-ce                                                                      12                   
docker.io   docker.io/alpinelinux/gitlab                       Alpine Linux based Gitlab image                 6                    
docker.io   docker.io/alpinelinux/gitlab-runner                Alpine Linux gitlab-runner (supports more ...   4                    
docker.io   docker.io/alpinelinux/gitlab-runner-helper         Helper image container gitlab-runner-helpe...   4                    
docker.io   docker.io/bitnami/gitlab-runner-helper                                                             3                    
docker.io   docker.io/okteto/gitlab                                                                            2                    
docker.io   docker.io/accurics/gitlab-connector                                                                0                    
docker.io   docker.io/alpinelinux/gitlab-shell                 Alpine Linux based gitlab-shell image, pro...   0                    
docker.io   docker.io/avenga/gitlab-job                                                                        0                    
docker.io   docker.io/corpusops/gitlabtools                    https://github.com/corpusops/docker-gitlab...   0                    
docker.io   docker.io/domjudge/gitlabci                                                                        0                    
docker.io   docker.io/drud/gitlab-backups                                                                      0                    
docker.io   docker.io/gromacs/gitlab-runner                                                                    0                    
docker.io   docker.io/itisfoundation/gitlab-runner-docker                                                      0                    
docker.io   docker.io/jitesoft/gitlab-ci-runner                  Image inheriting from the gitlab runner....   0                    
docker.io   docker.io/osuosl/gitlab-runner-helper                                                              0                    
docker.io   docker.io/pnnlmiscscripts/gitlab-runner-operator                                                   0                    
docker.io   docker.io/ustclug/gitlab                           Dockrized GitLab used by LUG@USTC               0                    
docker.io   docker.io/vulhub/gitlab                                                                            0                    
docker.io   docker.io/vulhub/gitlab-cve-2016-9086              gitlab cve-2016-9086                            0                    [OK]
docker.io   docker.io/wodby/gitlab                             Alpine-based GitLab CE container image          0                    
docker.io   docker.io/wodby/gitlab-nginx                       Nginx for GitLab CE container image             0                    
docker.io   docker.io/wodby/gitlab-runner                                                                      0                    
```

拉取gitlab
```bash
[root@localhost gitlab_docker]# docker pull gitlab/gitlab-ce:latest
```

查看
```bash
docker images
```

编辑docker-compose.yml文件
```
version: '3.1'
services:
    gitlab:
        image: 'gitlab/gitlab-ce:latest'
        container_name: gitlab
        # docker启动，gitlab启动
        restart: always
        environment:
            GITLAB_OMNIBUS_CONFIG: | 
            # 宿主机IP
                external_url 'http://192.168.181.137:8989'   
                gitlab_rails['gitlab_shell_ssh_port'] = 2224
        ports:
            - '8989:8989'
            - '2224:2224'
        volumes:
            - './config:/etc/gitlab'
            - './logs:/var/log/gitlab'
            - './data:/var/opt/gitlab'
```

```
version: '3.1'
services:
    gitlab:
        image: 'gitlab/gitlab-ce:latest'
        container_name: gitlab
        restart: always
        environment:
            GITLAB_OMNIBUS_CONFIG: | 
                external_url 'http://192.168.181.137:8989'   
                gitlab_rails['gitlab_shell_ssh_port'] = 2224
        ports:
            - '8989:8989'
            - '2224:2224'
        volumes:
            - './config:/etc/gitlab'
            - './logs:/var/log/gitlab'
            - './data:/var/opt/gitlab'
```

启动
```bash
docker-compose up -d
```

![Alt text](./images/DevOps/image4.png)

图中的错误重启docker即可

`docker-compose up -d`启动成功之后，可以在浏览器通过8989端口访问

- 查看内部日志指令
```bash
docker-compose logs -f
```

进入容器内部查看密码
```bash
docker exec -it gitlab bash
cat /etc/gitlab/initial_root_password
# 文件里有默认的密码
# Zdl97KLUR5qFCdTxMJ1pDu9Q2BnubOFTHqlkmteK0m4=
```
登录进去之后，可以用户那里修改密码

## maven安装配置

克隆虚拟机，修改网卡信息

```bash
vim /etc/sysconfig/network-scripts/ifcfg-ens33
# 重启网卡
systemctl restart network
```

下载jdk8，maven

```bash
# 后面的目录是安装到哪里
tar -zxvf jdk-8u231-linux-x64.tar.gz -C /usr/local

tar -zxvf apache-maven-3.6.3-bin.tar.gz -C /usr/local
```

```bash
cd /usr/local

# 名字太长，可以修改
mv jdk1.8.0_231/ jdk/

mv apache-maven-3.6.3/ maven/

cd maven/

cd conf/

vim setting.xml

# 添加阿里云仓库地址

# JDK8编译插件配置settings.xml

# 开启一下JDK8
```

![Alt text](./images/DevOps/image6.png)

![Alt text](./images/DevOps/image7.png)

![Alt text](./images/DevOps/image8.png)

:::tip
vim里面`:set nu`指令可以显示文件的行
:::

## docker

docker依赖项安装
```bash
yum -y install yum-utils device-mapper-persistent-data lvm2
```

设置阿里云镜像

```bash
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

```

安装docker

```bash
yum -y install docker-ce
```

启动docker并设置开机自启
```bash
systemctl start docker

systemctl enable docker
```

测试安装成功
```bash
docker version
```

docker-compose安装

在github上搜索docker/compose，下载已发布的压缩文件
docker-compose-Linux-x86_64
(本身就是一个可执行文件，但没有执行权限)

设置可执行权限
```bash
chmod +x docker-compose-Linux-x86_64

# 改个名字
mv docker-compose-Linux-x86_64 docker-compose

# 放到PATH  
echo $PATH

mv docker-compose /usr/bin

# 放到PATH之后任何位置可以执行
docker-compose version
```

## Jenkins
Jenkins涉及到将编写完毕的代码发布到测试环境和生产环境的任务，并且还涉及到了构建项目等任务。

Jenkins需要大量的插件保证工作，安装成本较高

### 介绍
Jenkins是一个开源软件项目，基于Java开发的一种持续集成工具

Jenkins应用广泛，大多数互联网公司都采用Jenkins配合GitLab、Docker、K8s作为实现DevOps的核心工具

Jenkins最强大的在于插件，Jenkins官方提供了大量的插件库，来自动化CI/CD过程中的各种琐碎功能

CI过程即是通过Jenkins将代码拉取、构建、制作镜像交给测试人员测试
- 持续集成：让软件代码可以持续的集成到主干上，并自动构建和测试

CD过程即是通过Jenkins将打好标签的发行版本代码拉取、构建、制作镜像交给运维人员部署
- 持续交付：让经过持续集成的代码可以进行手动部署
- 持续部署：让可以持续交付的代码随时随地的自动化部署

![Alt text](./images/DevOps/image9.png)

### Jenkins安装
[https://www.jenkins.io/](https://www.jenkins.io/)

进入官网，点击docker安装方式，跳转到相应页面，按照指令进行安装即可

```bash
docker pull jenkins/jenkins:2.319.1-lts
```

:::tip
lts：持续稳定版本的意思
:::

在/usr/local里面创建docker文件夹，再创建jenkibs_docker文件夹

编写docker-compose.yml文件
```
version: "3.1"
services:
  jenkins:
    image: jenkins/jenkins:2.319.1-lts
    container_name: jenkins
    ports:
      - 8080:8080
      - 50000:50000
    volumes:
      - ./data/:/var/jenkins_home/
```
`/var/jenkins_home/`是安装jenkins成功之后的home目录，插件、项目最终都会在这个目录下进行一些操作，映射到宿主机的`./data/`目录下

使用`docker-compose up -d`指令跑起来

使用`docker logs -f jenkins`查看日志

报错如下：
```bash
[root@localhost jenkins_docker]# docker logs -f jenkins 
touch: cannot touch '/var/jenkins_home/copy_reference_file.log': Permission denied
Can not write to /var/jenkins_home/copy_reference_file.log. Wrong volume permissions?
```

解决方法，给data目录增加权限：
```bash
[root@localhost jenkins_docker]# chmod -R 777 data
```

再次启动：
```bash
docker-compose restart
```

注：在这一步，还是报错

解决办法如下：

1、检查Docker服务状态，确保Docker服务正在运行

```bash
systemctl status docker
```

如果没有运行，使用以下命令启动：

```bash
systemctl start docker
```

2、清理不使用的容器和镜像，不使用的容器额镜像可能会导致Docker数据不一致

```bash
docker container prune
docker image prune -a
```

3、重新创建容器，如果还没有解决，尝试删除并重建

首先停止并删除容器
```bash
docker-compose down
```
然后重新启动
```bash
docker-compose up -d
```


插件下载失败是正常的，可后续下载

进入页面的插件管理，搜索Git Parameter，Publish Over SSH

### 配置

配置jdk和maven：

![Alt text](./images/DevOps/image16.png)

将jdk和maven挪到Jenkins里面，映射到容器内部

![Alt text](./images/DevOps/image10.png)

在页面配置如下：
![Alt text](./images/DevOps/image11.png)

![Alt text](./images/DevOps/image12.png)

![Alt text](./images/DevOps/image13.png)


为了推送而进行的配置：

![Alt text](./images/DevOps/image15.png)

在Publish Over SSH插件配置里面

注意要提前创建好test目录

![Alt text](./images/DevOps/image14.png)


## CI操作

创建一个简单的spring boot项目

在gitlab创建一个仓库
![Alt text](./images/DevOps/image17.png)

按照仓库给的提示进行git配置

推送到gitlab仓库


![Alt text](./images/DevOps/image37.png)

在Jenkins创建任务：New Item
![Alt text](./images/DevOps/image18.png)

输入，保存之后，Jenkins会自动拉取gitlab地址

可以进容器查看一下是否已经拉取
```bash
docker exec -it jenkins bash
```

然后maven设置，让Jenkins可以通过maven进行package操作

![Alt text](./images/DevOps/image19.png)

![Alt text](./images/DevOps/image20.png)

然后进行构建，第一次构建时间比较长
![Alt text](./images/DevOps/image21.png)

jenkins把构建好的jar包推送到目标服务器，目标服务器把它运行起来，运行方式是docker

还在刚刚界面，构建后操作：
![Alt text](./images/DevOps/image22.png)

目标服务器在前面已经配置过了
![Alt text](./images/DevOps/image23.png)

要是想能够自动在docker，需要在项目中追加Dockerfile文件

先找一个基础镜像
[https://hub.daocloud.io/](https://hub.daocloud.io/)

搜索Java

![Alt text](./images/DevOps/image24.png)

在里面找一个8的
![Alt text](./images/DevOps/image25.png)

![Alt text](./images/DevOps/image26.png)

```dockerfile
FROM daocloud.io/library/java:8u40-jdk
COPY demo.jar /usr/local/
WORKDIR /usr/local/
CMD java -jar demo.jar
```

```yml
# docker-compose.yml
version:'3.1'
services:
  demo:
    build:
      context: ./
      dockerfile: Dockerfile
    image: demo:v1.0.0
    container_name: demo
    ports:
      - 8081:8080
```

推送到gitlab

配置更新：
![Alt text](./images/DevOps/image27.png)
![Alt text](./images/DevOps/image28.png)
![Alt text](./images/DevOps/image29.png)


下面这个指令可以清楚重复的镜像
```bash
docker image prune -f
```
![Alt text](./images/DevOps/image30.png)

![Alt text](./images/DevOps/image31.png)

## CD操作

![Alt text](./images/DevOps/image32.png)

![Alt text](./images/DevOps/image33.png)

gitlab新建tag
![Alt text](./images/DevOps/image34.png)

再新建一个v2.0.0

Jenkins可以选择tag，然后根据版本显示不同内容

![Alt text](./images/DevOps/image35.png)

## SonarQube

检测代码质量

![Alt text](./images/DevOps/image36.png)

是一个开源代码分析平台，支持多种语言。检查代码中是否有重复内容，漏洞等等。可以基于多种平台。

![Alt text](./images/DevOps/2/image.png)

![Alt text](./images/DevOps/2/image-2.png)

创建文件夹sonarqube_docker
创建docker-compose.yml
![Alt text](./images/DevOps/2/image-3.png)

docker-compose up -d跑起来

报错处理：虚拟内存不足
![Alt text](./images/DevOps/2/image-5.png)
![Alt text](./images/DevOps/2/image-4.png)

![Alt text](./images/DevOps/2/image-6.png)

安装中文插件
![Alt text](./images/DevOps/2/image-7.png)

在maven中配置sonar
![Alt text](./images/DevOps/2/image-8.png)

![Alt text](./images/DevOps/2/image-9.png)

如果有maven的环境变量，可在命令行检测：
![Alt text](./images/DevOps/2/image-10.png)

![Alt text](./images/DevOps/2/image-11.png)

sonar-scanner下载：
![Alt text](./images/DevOps/2/image-12.png)

yum install -y unzip安装解压软件

![Alt text](./images/DevOps/2/image-13.png)

![Alt text](./images/DevOps/2/image-14.png)

sonar-scanner移动到Jenkins的data目录下
![Alt text](./images/DevOps/2/image-15.png)

编辑配置文件：

![Alt text](./images/DevOps/2/image-17.png)
![Alt text](./images/DevOps/2/image-16.png)

利用sonar-scanner里面的东西检测workspace里面的代码：
![Alt text](./images/DevOps/2/image-18.png)

![Alt text](./images/DevOps/2/image-19.png)

![Alt text](./images/DevOps/2/image-20.png)

检测命令：
![Alt text](./images/DevOps/2/image-21.png)
上图命令是-D，不是-S
![Alt text](./images/DevOps/2/image-22.png)

![Alt text](./images/DevOps/2/image-23.png)

![Alt text](./images/DevOps/2/image-24.png)

![Alt text](./images/DevOps/2/image-25.png)

![Alt text](./images/DevOps/2/image-26.png)
![Alt text](./images/DevOps/2/image-27.png)

![Alt text](./images/DevOps/2/image-28.png)

### jenkins集成sonarqube
在Jenkins里面下载插件：
![Alt text](./images/DevOps/2/image-29.png)

![Alt text](./images/DevOps/2/image-30.png)

![Alt text](./images/DevOps/2/image-31.png)

![Alt text](./images/DevOps/2/image-32.png)
![Alt text](./images/DevOps/2/image-33.png)

![Alt text](./images/DevOps/2/image-34.png)

![Alt text](./images/DevOps/2/image-35.png)

![Alt text](./images/DevOps/2/image-36.png)

![Alt text](./images/DevOps/2/image-37.png)

## harbor自定义镜像
![Alt text](./images/DevOps/2/image-38.png)

安装：GitHub下载安装包，解压一下

![Alt text](./images/DevOps/2/image-39.png)
修改配置文件：
![Alt text](./images/DevOps/2/image-40.png)

![Alt text](./images/DevOps/2/image-41.png)
![Alt text](./images/DevOps/2/image-42.png)

![Alt text](./images/DevOps/2/image-43.png)

![Alt text](./images/DevOps/2/image-44.png)

:80访问

admin
默认密码


![Alt text](./images/DevOps/2/image-46.png)

![Alt text](./images/DevOps/2/image-45.png)

![Alt text](./images/DevOps/2/image-47.png)

![Alt text](./images/DevOps/2/image-48.png)
报错，是因为修改完之后没有重启docker

![Alt text](./images/DevOps/2/image-49.png)
再次报错，显示没有权限，是因为没有登录harbor
![Alt text](./images/DevOps/2/image-50.png)

拉取harbor里面的镜像
![Alt text](./images/DevOps/2/image-51.png)
