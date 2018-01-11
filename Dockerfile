FROM hseeberger/scala-sbt
ADD ./evo-time-be /evo-time-be
WORKDIR /evo-time-be
RUN sbt clean dist
RUN unzip ./target/universal/evo-time-be-1.0-SNAPSHOT.zip -d /app
WORKDIR /app
CMD ["/app/evo-time-be-1.0-SNAPSHOT/bin/evo-time-be"]
