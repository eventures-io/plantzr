FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

# Bundle app source
COPY ./dist /plantzr

ENV NODE_ENV production

#user: "appUser",
#pwd: "pl1ntzr9",
#IP: 130.211.109.209
#PORT: 27017

ENV MONGO_GCLOUD_URI mongodb://appUser:pl1ntzr9@130.211.109.209:27017/plantzr

#Don't install devDependencies
RUN npm config set production

RUN cd /plantzr; npm install

EXPOSE  8080
CMD ["node", "plantzr/server/app.js"]