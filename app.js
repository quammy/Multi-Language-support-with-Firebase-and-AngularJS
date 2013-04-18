function LanguageCtrl($scope) {

    $scope.words = JSON.parse('{}');

    $scope.addWord = function (Name, Value) {
        $scope.words[Name] = Value;
    };

    $scope.getWord = function (Name) {
        return $scope.words[Name];
    };
};

var ref;
var refLang;
var onLangChange;

$(document).on("pageinit", "#page_Main", function (event) {
    ref = new Firebase('https://[your FB].firebaseio.com/');
    ChangeLangTo("En");//default lang
});

function ChangeLangTo(lang) {
    //remove old ref if exists, so while user is using language X, changes in language Y wont affect him
    if (onLangChange != undefined && onLangChange != undefined) { refLang.off('child_changed', onLangChange) };

    refLang = ref.child(lang);

    //reading once all words
    refLang.once('value', function (dataSnapshot) {
        var lang = dataSnapshot.val();
        angular.element($("#page_Main")).scope().$apply(function (scope) {
            $.each(lang, function (key, value) {
                scope.addWord(key, value);
            });
        });
    });

    //listening to changes
    onLangChange = refLang.on('child_changed', function (childSnapshot, prevChildName) {
        angular.element($("#page_Main")).scope().$apply(function (scope) {
            scope.addWord(childSnapshot.name(), childSnapshot.val());
        });
    });
};
