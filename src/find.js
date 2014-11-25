(function() {

    var trimLeft = /^\s+/;
    var trimRight = /\s+$/;

    // group 1 must be the id
    var idRegExp = /^#(\S+)$/;

    // group 1 must be the tagName and group 2 must be the className
    var tagClassRegExp = /^([\w-]+)?(?:\.([\w-]+))?$/;

    function trim(str) {
        return str.replace(trimLeft, '').replace(trimRight, '');
    }

    function isHostMethod(obj, prop) {
        return (typeof obj[prop] === 'function') ||
                ((typeof obj[prop] === 'object') && (obj[prop] !== null)); // Internet Explorer
    }

    function findAllInDOM(node, func) {
       var results = [];
       function walk(node) {
           if (func(node)) {
               results.push(node);
           }
           node = node.firstChild;
           while (node) {
               walk(node);
               node = node.nextSibling;
           }
       }
       walk(node);
       return results;
    }

    function findInDOM(node, func) {
        function walk(node) {
            if (func(node)) {
                return node;
            }
            node = node.firstChild;
            while (node) {
                var result = walk(node);
                if (result) {
                    return result;
                }
                node = node.nextSibling;
            }
        }
        return walk(node);
    }

    function findById(id, root) {
        return (root.id === id) ?
                   root :
                   (isHostMethod(root, 'getElementById')) ?
                       root.getElementById(id) :
                       (isHostMethod(root, 'querySelector')) ?
                           root.querySelector('#' + id) :
                           findInDOM(root, function(node) {return node.id === id;});
    }

    function getTagNameClassNameMatcher(tagName, className) {
        tagName = tagName ? tagName.toUpperCase() : '*';
        if (className) {
            var regExp = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
        }
        return function(element) {
            return (((tagName === '*') ||
                     (element.tagName && (element.tagName.toUpperCase() === tagName))) &&
                    ((!className) ||
                     regExp.test(element.className)));
        }
    }

/**

Search for all elements matching the CSS selector. Returns an array of the elements.

Acceptable simple selectors are of the following forms only.

    div
    #alpha
    .beta
    div.gamma

In the case of a #myId selector, the returned array will always have
zero or one elements. It is more likely that you want to call grail.find when
using an id selector.

If the root element is supplied then it is used as the starting point for the search.
The root element will be in the results if it matches the selector.
If the root element is not supplied then the current document is used
as the search starting point.

    grail.findAll('#alpha');
    grail.findAll('div.gamma', document.body);

@param {string} selector The CSS selector for the search.

@param {Document|Element} [root] The element to use as the search start point.

@return {Array} An array of matching `Element` objects.

*/
    grail.findAll = function(selector, root) {
        selector = trim(selector);
        root = root || document;
        var matches;
        if (matches = selector.match(idRegExp)) {
            var el = findById(matches[1], root);
            return el ? [el] : [];
        }
        else if (matches = selector.match(tagClassRegExp)) {
            var tagNameClassNameMatcher = getTagNameClassNameMatcher(matches[1], matches[2]);
            if (isHostMethod(root, 'querySelectorAll')) {
                var elements;
                var results = [];
                if (tagNameClassNameMatcher(root)) {
                    results.push(root);
                }
                elements = root.querySelectorAll(selector);
                for (var i = 0, ilen = elements.length; i < ilen; i++) {
                    results.push(elements[i]);
                }
                return results;
            }
            else {
                return findAllInDOM(root, tagNameClassNameMatcher);
            }
        }
        else {
            throw new Error('grail.findAll: Unsupported selector "'+selector+'".');
        }
    };

/**

Search for the first element matching the CSS selector. If the element is
found then it is returned. If no matching element is found then
null or undefined is returned.

The rest of the details are the same as for grail.findAll.

@param {string} [selector] The CSS selector for the search.

@param {Document|Element} [root] The element to use as the search start point.

@return {Element} The found `Element`.

*/
    grail.find = function(selector, root) {
        selector = trim(selector);
        root = root || document;
        var matches;
        if (matches = selector.match(idRegExp)) {
            return findById(matches[1], root);
        }
        else if (matches = selector.match(tagClassRegExp)) {
            var tagNameClassNameMatcher = getTagNameClassNameMatcher(matches[1], matches[2]);
            if (isHostMethod(root, 'querySelector')) {
                return tagNameClassNameMatcher(root) ? root : root.querySelector(selector);
            }
            else {
                return findInDOM(root, tagNameClassNameMatcher);
            }
        }
        else {
            throw new Error('grail.find: Unsupported selector "'+selector+'".');
        }
    };

}());
