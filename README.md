There is a bug in Jest that prevents different mock statuses on CommonJS modules that are required 
using just the module name for requiring (for example `require('lodash');`)

See an example of the bug on [`RequireBug.spec.js`](client/scripts/__tests__/RequireBug.spec.js)

**Explanation:**
HasteModuleLoader that is used by both jest.dontMock and jest.setMock returns undefined on

```
/*line 362*/ var resource = this._resourceMap.getResourceByPath(absolutePath);
```

Because of this the `var moduleID = this._getNormalizedModuleID(currPath, moduleName);`
gets set to "user::"

Every time this reference is changed, it changes the mock status for every other module
that is referenced only by it's module name. Using relative path on require fixes the problem.