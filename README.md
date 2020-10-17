# ModularTask
Simple task application build with vanilla JavaScript ( no library ) using Object  literal pattern and PubSub pattern 

## Object literal pattern
A javascript object literal is a comma separated list og name value pairs wrapped in curly braces. Object literal encapsulate data, enclosing it in a package.
This will minimizes the use of global variables which can cause problems when combining code.

## PubSub ( Publisher / Subscriber ) pattern
Very useful for decoupling modules, and creates communication between mudules. Similer to the Observer pattern but with a little diffrence, in the Observer pattern the observer knows about the Subject ( Observable ), Whereas in pub-sub, the publishers and subscribers are loosely coupled, they are unaware of even the existence of each other.

![Pub-Sub diagram](https://github.com/Aniss-nahim/ModularTask/blob/master/PubSub.png)
