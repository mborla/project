# project
Tool for annotations.

## Usage

1. On the command line:
```
composer install
```

2. MySQL in local. Create a database named "database".

3. Edit 'user' in config.json in "project" folder.

4. Create a new JSON configuration file in the "project_config" folder following the example of config_pew.json. 
'num_tweet' must be the exact number of sentences to note in your dataset.

5. On the command line:
```
php artisan config:cache
```

6. Create the tables in your local database with command:  
```
php artisan migrate --seed
```
this command inserts a new User with the name specified previously in config.json

7. Run:
```
php artisan serve
```

