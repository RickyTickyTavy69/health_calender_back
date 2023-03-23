create TABLE "users"(
                        id SERIAL PRIMARY KEY,
                        username VARCHAR(255) unique,
                        password VARCHAR(255),
                        salt VARCHAR(255),
                        email VARCHAR(255) unique,
                        createdAt Date,
                        updatedAt Date,
                        periodData JSON,
);