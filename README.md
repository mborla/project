# project
Tool for annotations.

## Usage

```
composer install
```

MySQL in local. Create a database named "database".

Edit 'user' in config.json.

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
Create a new configuration file in the "project_config" folder following the example of config_pew.json. 
'num_tweet' must be the exact number of sentences to note in your dataset.
