TODO

Lessons learned:
> Webpack
- loaded modules/resources are relative to the URL, such that if say you find yourself in a child route,<br />
http://localhost:1337/dashboard/overview <br />
then requests from within this component will go to &#42;/dashboard/bla bla and not to &#42;/bla bla anymore, which I personally believe right now is fkin retarded <br />
you can fix this of course by directing your loaders to generate an absolute path, i.e. &lt;img src="/some-hashcode.png" /&gt; -> see .babelrc loaders as an example