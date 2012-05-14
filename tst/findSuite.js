(function() {

    var root = document.createElement('div');

    var alpha = document.createElement('div');
    alpha.id = 'alpha';
    root.appendChild(alpha);

    var beta = document.createElement('div');
    beta.id = 'beta';
    root.appendChild(beta);

    var gamma = document.createElement('span');
    gamma.className = 'gamma Gamma GAMMA';
    alpha.appendChild(gamma);

    buster.testCase("find test suite", {

        "test find id for existing element": function() {
            var el = grail.find('#alpha', root);
            assert.same(alpha, el);
        },

        "test find id for non-existing element": function() {
            var el = grail.find('#non-existing-id', root);
            assert(el === null || el === undefined);
        },

        "test find class for existing element": function() {
            var el = grail.find('.Gamma', root);
            assert.same(gamma, el);
        },

        "test find tag existing element": function() {
            var el = grail.find('span', root);
            assert.same(gamma, el);
        },

        "test find tag and class for existing element": function() {
            var el = grail.find('span.Gamma', root);
            assert.same(gamma, el);
        },

        "test find tag and class for non-existing element": function() {
            var el = grail.find('div.Gamma', root); // note that .Gamma is a span
            assert(el === null || el === undefined);
        },

        "test find excess whitespace on selector is ok": function() {
            var el = grail.find('   #alpha   ', root);
            assert.same(alpha, el);
        },
        
        // findAll ------------
        
        "test findAll id for existing element": function() {
            var arr = grail.findAll('#alpha', root);
            assert.same(1, arr.length);
            assert.same(alpha, arr[0]);
        },

        "test findAll id for non-existing element": function() {
            var arr = grail.findAll('#non-existing-id', root);
            assert.same(0, arr.length);
        },

        "test findAll class for existing element": function() {
            var arr = grail.findAll('.Gamma', root);
            assert.same(1, arr.length);
            assert.same(gamma, arr[0]);
        },

        "test findAll tag existing elements": function() {
            var arr = grail.findAll('div', root);
            assert.same(3, arr.length);
            assert.same(root, arr[0]);
            assert.same(alpha, arr[1]);
            assert.same(beta, arr[2]);
        },

        "test findAll tag and class for existing element": function() {
            var arr = grail.findAll('span.Gamma', root);
            assert.same(1, arr.length);
            assert.same(gamma, arr[0]);
        },

        "test findAll tag and class for non-existing element": function() {
            var arr = grail.findAll('div.Gamma', root); // note that .Gamma is a span
            assert.same(0, arr.length);
        },

        "test findAll excess whitespace on selector is ok": function() {
            var arr = grail.findAll('   #alpha   ', root);
            assert.same(1, arr.length);
            assert.same(alpha, arr[0]);
        }

    });

}());
