Multi-Language-support-with-Firebase-and-AngularJS
==================================================

Firebase + AngularJS = no-brainer multi-lingual support

Simple Firebase structure:
==========================
{

  "Es" : 
  {
    "DESCRIPTION" : "Descripción",
    "NAME" : "Nombre"
  },

"En" : 
{
    "DESCRIPTION" : "Description",
    "NAME" : "Name"
  }

}

Simple AngularJS controller:
============================
        function LanguageCtrl($scope) {
            $scope.words = JSON.parse('{}');
            $scope.addWord = function (Name, Value) {
                $scope.words[Name] = Value;
            };
            $scope.getWord = function (Name) {
                return $scope.words[Name];
            };
        };

and a few lines of code:

        var ref;
        var refLang;
        var onLangChange;

        $(document).on("pageinit", "#page_Main", function (event) {
            ref = new Firebase('https://[your FB].firebaseio.com/');
            ChangeLangTo("En");//default lang
        });

        function ChangeLangTo(lang) {
            if (onLangChange != undefined && onLangChange != undefined) {refLang.off('child_changed', onLangChange)};
            refLang = ref.child(lang);
            refLang.once('value', function (dataSnapshot) {
                var lang = dataSnapshot.val();
                angular.element($("#page_Main")).scope().$apply(function (scope) {
                    $.each(lang, function (key, value) {
                        scope.addWord(key, value);
                    });
                });
            });
            onLangChange = refLang.on('child_changed', function (childSnapshot, prevChildName) {
                angular.element($("#page_Main")).scope().$apply(function (scope) {
                    scope.addWord(childSnapshot.name(), childSnapshot.val());
                });
            });
        };
        
That's it.

On first load, will load the English version and then all you need to do is to call ChangeLangTo with the language of your choice (that exists in your FB...).

Change of selected language will occur immediately in the HTML.

One 'pitfall', if a value is missing from language X, the value that will show will be of the language last had that value defined.

Any comments are more than welcome!
-----------------------------------
