FROM mhart/alpine-node
WORKDIR /app
COPY ./web .
RUN rm -rf /app/node_modules
RUN yarn install
RUN yarn run build
RUN yarn global add serve
WORKDIR /app/build
CMD ["serve", "-p 80", "-s", "."]
