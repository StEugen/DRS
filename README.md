# Data Representation Site

This site is made for use inside the company i work in, it's only purpose is to store and list data (serial numbers of hardware). It has the abillities to create users, cabinets, hardware and faculties, search is available.  

## Stack
- Django Rest-Framework
- React (+MUI)
- PostgreSQL
- Docker
- Nginx (as reverse proxy)

# Repository overview
- backend/ 
	- backend/ - autogenerated folder, urls and settings stored here
	- data/ - app folder: Views, models, serializers are stored here
	- manage.py
- frontend/
	- public/ - folder with static files
	- src/ - folder which contains all the compiled files of project
- LICENCE - Apache Licence
- TODO.md - list of what should be done 
- REST_API.md - file which describes api


# To start a project
1. Install docker
	- to install on Linux go to <a href='https://docs.docker.com/desktop/install/linux-install/'>Docker for Linux installation instruction</a> or use <a href='https://opus-5.onrender.com'>Opus-5</a> tool to generate installation script
2. Take git repository
	- <code>$ git clone https://github.com/StEugen/DRS.git </code>
3. Install docker-compose tool
	- <code>$ sudo apt install docker-compose</code>
4. go to project folder and run <code>docker-compose up -d --build</code>
5. You're ready to use

# Webapp design
without Docker etc, etc...
<img src='./img/Design.jpg' />
