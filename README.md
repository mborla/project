# project
Tool for annotations.

## Usage
In your file system, navigate to the project directory.

Edit DB_DATABASE, DB_USERNAME, DB_PASSWORD in file 'env'. 

Edit 'user' in config.php.

On the command line:
```
php artisan config:cache
```
Create the tables in your local database with command:
```
php artisan migrate --seed
```
Run:
```
php artisan serve
```

## Demo data
Before inserting a new project modify 'num_tweet' in config.php with the exact number of sentences to note
