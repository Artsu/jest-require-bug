/** @jsx React.DOM */

describe('Jest', function() {
  it('uses the same mock reference on every CommonJS module that is required using just the module name', function() {

    expect(require('react')     .mockImplementation).not.toBeDefined(); //React is not mocked because it is defined on package.json > unmockedModulePathPatterns
    expect(require('lodash')    .mockImplementation).toBeDefined();     //Gets automatically mocked by jest
    expect(require('underscore').mockImplementation).toBeDefined();     //Gets automatically mocked by jest

    jest.dontMock('underscore');

    expect(require('react')     .mockImplementation).not.toBeDefined();
    expect(require('lodash')    .mockImplementation).toBeDefined();     //FAIL: This should be mocked but it isn't
    expect(require('underscore').mockImplementation).not.toBeDefined();

    jest.setMock('lodash', jest.genMockFunction());

    expect(require('react')     .mockImplementation).not.toBeDefined(); //FAIL: This shouldn't be mocked but it is
    expect(require('lodash')    .mockImplementation).toBeDefined();     //This passes this time around as it gets mocked again
    expect(require('underscore').mockImplementation).not.toBeDefined(); //FAIL: This shouldn't be mocked but it is


    // HasteModuleLoader that is used by both jes.dontMock and jest.setMock returns undefined on
    // line 362::  var resource = this._resourceMap.getResourceByPath(absolutePath);
    //
    // Because of this the var moduleID = this._getNormalizedModuleID(currPath, moduleName);
    // gets set to "user::"
    //
    // Every time this reference is changed, it changes the mock status for every other module
    // that is referenced only by it's module name. Using relative path on require fixes the problem.

  });
});
