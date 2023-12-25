# base image
FROM node:18.17.0-bullseye-slim as base

# Set Enviroments
ENV EnvLoader Docker
ENV PATH /app/node_modules/.bin:$PATH

# Change Work directory
WORKDIR /app

FROM base as build
# Copy packege json and package lock
COPY package.json yarn.lock ./

# Install
RUN yarn install && \
    yarn cache clean --force

# Build
RUN yarn build

FROM base as dev
ENV NODE_ENV "development"

# Copy Files
COPY --from=build /app/dist ./

CMD ["index.js"]

FROM base as pro
ENV NODE_ENV "production"

# Copy Files
COPY --from=build /app/dist ./

CMD ["index.js"]