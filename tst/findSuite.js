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

        "test class for existing element": function() {
            var el = grail.find('.Gamma', root);
            assert.same(gamma, el);
        },

        "test tag existing element": function() {
            var el = grail.find('span', root);
            assert.same(gamma, el);
        },

        "test tag and class for existing element": function() {
            var el = grail.find('span.Gamma', root);
            assert.same(gamma, el);
        },

        "test tag and class for non-existing element": function() {
            var el = grail.find('div.Gamma', root); // note that .Gamma is a span
            assert(el === null || el === undefined);
        },

        "test excess whitespace on selector is ok": function() {
            var el = grail.find('   #alpha   ', root);
            assert.same(alpha, el);
        }

    });

}());
