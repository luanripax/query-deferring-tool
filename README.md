# relax-deferring-tool

## What is this about ?

This project is a tool for comparing SQL queries, using the Relax Database API. Basically, two queries are needed. The first refers to a query that was written by a student,
and the second one, was written by the teacher. The program aims to compare both queries and tell if they are different or not.

## Requirements

- node.js v14.15.2 (not tested on other versions)
- Google Chrome (used for web scraping)

## Methods

There are 3 main methods in the program:

- ```checkQuery(query)```
> A method that returns if a query passed as an argument is valid or not.

- ```runAndCompareQuery(key, query)```
> A method that receive 2 queryies as an argument, an return 1 if they produce the same result, 0 if not, and 2 for anything else (e.g., an error)

- ```runAndCompareQueryPRO(key, query, chk_cols, chk_order)```
> A method that receive 2 queries, and 2 flags as an argument. If "chk_cols" is passed as 1, the method will check if the names of the columns on both queries are the same. If "chk_order" is passed as 1, the method will check if the order of the rows is the same.

## Development

The program was developed using the concept of serialization, in order to perform as low requests as possible. It's used a data structure that stores the information of the queries that will be used after. By doing that, the program can execute itself by performing only 2 requests. The first method `checkQuery` only checks the text contained on it's html element called "success". The next method "runAndCompareQuery" was developed through an iterative proccess. For each element on a query's result, it its checked if that element appears on the other query. And also if the amount of elements on both queries is the same. For our last method "runAndCompareQueryPRO", for both flags, the array result is converted on a string, and those string are the new elements to be compared.

## Usage

The credentials of the database can be found on a ```db.config``` file, at the root of the project. Here's an example of that file:

```
relax_host=https://myhost.com.db
relax_port=80
relax_database=local/my/db
```

In order to execute the program, first thing we need is to initialize those informartion contained at the ```db.config``` file. We can do this by executing the following cmd:

```source db.config```

After that, all we need to do is run a node command, passing as an argument those information that was stored on enviroment variables, and also the path to the queries that will be compared.

```node index.js [host] [port] [db] [key] [query]```

The `key` query refers to the teacher's query, and the `query` refers to the student's query.

## Example 

If node is already installed, first we need to setup all dependencies using, at the root of the project:

```npm install```

Now, we are going to use these credentials:

```
relax_host=https://dbis-uibk.github.io
relax_port=80
relax_database=local/uibk/local/0
```

Now we initialize our credentials from db.config, storing them on enviroment variables:

```source db.config```

Then, we can run our main cmd (Assuming that both query files are stored on a "query" folder) :

```node index.js $relax_host $relax_port $relax_database query/key.sql query/query.sql```

That will result in the following:

```
Result:

- Both queries are valid
- runAndCompareQuery: 1
- runAndCompareQueryPRO: 0
```

In order to change the flags of the PRO method, all we need to do is change those flags at the `index.js` file, line 37:

```console.log(`- runAndCompareQueryPRO: ${await runAndCompareQueryPRO(key,query,1,1)}`);```









