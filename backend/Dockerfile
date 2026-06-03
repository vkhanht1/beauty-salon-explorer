FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

COPY gradle /app/gradle
COPY gradlew build.gradle.kts settings.gradle.kts /app/

RUN chmod +x gradlew

RUN ./gradlew dependencies -Porg.gradle.java.installations.auto-download=false -Porg.gradle.java.installations.auto-detect=false --no-daemon

COPY src /app/src
RUN ./gradlew bootJar -Porg.gradle.java.installations.auto-download=false -Porg.gradle.java.installations.auto-detect=false -x test --no-daemon

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]