# <a href='https://github.com/ev1stensberg/glimt'><img src="https://s12.postimg.org/kfxwuls8d/glimt_copy.png" align="center" height="250" "/></a>

***

######Glimt is a utility library written in Node. In large applications, you have large modules, often with the same comments around the same thing. Glimt is made, so you can avoid to rewrite those.
######The library has also included some other features, like module clearing and line clearing with no hazzle

***
#List of Content

- [Installation](#installation)
* [Setting up Glimt](#setup)
* [CLI Commands](#commands)
* [Examples](www.google.com)
* [Lisence](https://github.com/ev1stensberg/glimt/blob/master/LICENSE.md)
* [Contribution](#contribution)

***

##Installation

Running Glimt, requires you to install it globally. It is not supported to run it as a module yet, if you want to run Glimt locally without installing it global, submit a [Feature Request](https://github.com/ev1stensberg/glimt/issues).

**To install Glimt, type the following command:**

 `npm install -g glimt`
 
##Setup
 
 Before we can run any scripts, we need to set up one thing, which is a `.glimtrc` file. In order for Glimt to validate and output at the correct time, we decided it is best for the user to decide where to implement a comment. A `.glimtrc` is no hazzle. It should look like this once you are done.
 
 ```json
 
 {
    "firstComment": [5, "// Look for me at line 5"]
}
 ```
 
 Now, what this do, is that it looks at line five if the code at line 5 is the same as what we just wrote. If not, it doesn't compile down to anything. The neat thing about this, is that you can actually swap out entire codelines, not only comments. 
 
 For now, having more than 13 characters to replace, may bug your line after the desired replacement line, so keep in mind to either use less than 13 characters until we solve this, or to include a "fallsafe", which would be another comment on the line below in order to preserve your code. Here's an example that will replace your comment with whatever you provide in the CLI
 
 ```js
const HelloMessage = (props) => <div>Hello, {props.name}</div>;
HelloMessage.propTypes = {
  name: React.PropTypes.string
}
// Look for me at line 5
HelloMessage.defaultProps = {
  name: 'John Doe'
}
ReactDOM.render(<HelloMessage name="Mădălina"/>, mountNode);
 ```
 
**Now you can run CLI-commands!**

##Commands

###Clearing Modules

If you want to clear every file in a folder, run:

`glimt -n myFolder`

If you want to only clear one File, run:

`glimt -f myFolder/myfile.js`

If you want to clear the line where your comment from .glimtrc is, run:

`glimt -l myFolder/myfile.js`


####Converting Comments 

If you want to compile an entire directory of files, run:

`glimt -d myFolder`

If you want to compile a given file in a directory, run:

`glimt -o myFolder/myfile.js`

##Contribution

Contributions are warmly welcomed! I'd like to use this occasion to thank Sindre Sorhus for being helpful to everyone all the time while making open-source great!
