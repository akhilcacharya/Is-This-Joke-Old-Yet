#Is This Joke Old Yet Bot

I realized after promising you to make a bot that most Reddit libraries for node totally suck for this purpose. So I made my own ;)

##Setup

Setup is super simple, even if you don't know JSON syntax. Its a matter of four simple steps. 

1. Navigate to the directory in your file system.

2. Rename "config.example.json" to "config.json"

3. Fire up your Node command prompt and navigate to the directory. 

4. Execute two commands sequentially: ``npm install``, and ``node ez_setup.js``. 

``ez_setup.js`` should walk you through adding in your Username, Password, User Agent (you shouldn't need to change this), delay, and the "old jokes" that you want to target. 

##Running the Bot

In your command prompt do ``node Bot.js``, and it'll start running. It'll query ``www.reddit.com/comments`` every few seconds, according to the delay you set in ez_setup. 

##License

The MIT License (MIT)

Copyright (c) 2014 Akhil Acharya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.