# Test project Article

#### Instructions to run the server
```bash
cd article 
```
```bash
cp .env.sample .env
```
```bash
docker-compose up -d
```  
#### REST API
Server is ready to accept requests:
  * `GET http://localhost:3000/api/v1/article` - list articles  
  * `GET http://localhost:3000/api/v1/article/id` - show article by id  
  * `POST http://localhost:3000/api/v1/article` - create article  
    ```json
    {  
      "title": "your title",  
      "description": "your description"  
    }  
    ```
  * `PUT http://localhost:3000/api/v1/article/id` - update article by id
    ```json
    {
      "title": "your title",
      "description": "your description"
    }
    ```
  * `DELETE http://localhost:3000/api/v1/article/id` - delete article by id

