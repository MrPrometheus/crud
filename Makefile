build:
	cd server && make build
	cd client && make build

run:
	docker-compose up

stop:
	docker-compose down