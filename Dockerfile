#Stage 1
#######################################
FROM node:14 AS builder
WORKDIR /app

# Install app dependencies
# Copies package.json and package-lock.json to Docker environment
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copies everything over to Docker environment
COPY . ./
RUN npm run build

#Stage 2
#######################################
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html

# Remove default nginx static resources
RUN rm -rf ./*

# Copies static resources from builder stage
COPY --from=builder /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]