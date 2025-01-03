# Specify the base image
# The FROM instruction initializes a new build stage and sets the Base Image for subsequent instructions
FROM node:19-alpine

# Copy package.json, wildcard used so both package.json AND package-lock.json are copied
# slash '/' at the end of app is important, so it created an app directory, otherwise you'll get an error,
# the first argument is from our local machine, the second argument is the path in the linux file system container
# the COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>
COPY package*.json /usr/app/

# Copy app files from our local machine to the container, from the src directory
# on our machine to the /usr/app directory in the linux file system container
COPY src /usr/app/

# Create app directory & set default dir so that next commands executes in /usr/app dir,
# this is like cd-ing into /usr/app to execute npm install, this is happening in the container's linux file system
# The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile
WORKDIR /usr/app

# Install app dependencies for the docker container, the RUN instruction is used to execute commands in the container
RUN npm install

# Start the application, CMD is the instruction that is executed when the docker container starts
# There can only be one CMD instruction in a Dockerfile, if you have multiple CMD instructions, only the last one will be executed
CMD ["node", "server.js"]
