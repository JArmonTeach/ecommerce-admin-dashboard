# ecommerce-admin-dashboard

## Project Description 
    Notes: MERN stack
                MongoDB
                ExpressJS
                ReactJS
                NodeJS
            
            Backend (npm start)
                NodeJS: runtime
                ExpressJS: backend framework
                Mongoose: managing MongoDB

            Frontend (npm start)
                Material UI: styling
                Material UI datagrid: tables
                NIVO: charts
                Redux toolkit: state management
                RTK Query: API calls

    Sidenote: customers page is client side pagination where the server sends all info to the frontend and any sorting happens on the frontend. for transactions page, we use server side pagination, where the frontend is just sent the data it needs to initial pagination, then the frontend will send its request for sorting to the backend when needed in which the server will send the new data out again; we do this with transactions because of how big the data is compared to the customers page


## Installation


## Usage


## Credits
    Tutorial that had ecommerce project: https://www.youtube.com/watch?v=0cPCMIuDk2I&t=19s

## License 
    MIT License

    Copyright (c) [2023] [JohnArmon Antolin]

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.