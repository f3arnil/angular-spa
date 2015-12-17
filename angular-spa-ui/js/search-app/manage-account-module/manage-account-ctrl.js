'use strict';

module.exports = function($scope, $state, accountService) {

    $scope.featuresManageAccount = {
        pageTitle: $state.current.data.pageTitle,
        userId: '',
        userName: '',
        editFormUserName: false,
        //editUserName: $scope.userName,
        //$scope.featuresManageAccount.userName = ''

        init: function() {
            this.pageTitle;
            this.userId = this.getUserId();
            this.userName = this.getUserName(this.userId);
        },

        getUserId: function() {
            var userId = GLOBAL_USER_ID;
            return userId;
        },
        getUserName: function(userId) {
            var userName = this.getUserById(userId);
            return userName;
        },

        getUserById: function(userId) {
            accountService.getUserById(userId)
                .then(
                    function(userObj) {
                        // TODO
                        $scope.featuresManageAccount.userName = userObj.data.name;
                },
                function(errorMessage) {
                    $scope.errorMessage(errorMessage);
                }
            );
        },

        editUserName: function() {
            this.editFormUserName = true;
            $scope.editUserName = $scope.userName;
        },

        cancelUserName: function() {
            this.editFormUserName = false;
        },

        saveUserName: function() {
            $scope.userName = $scope.editUserName;
            $scope.editUserNameCancel();
        },

        showBlock: function() {

        },

        hideBlock: function() {
            
        }

    };

    $scope.featuresManageAccount.init();

    console.log($scope);

/*
    //console.log($scope.globalUserId);

    $scope.userName = "Default user name!";
    $scope.editFormUserName = false;

    $scope.userNameEdit = function() {
        $scope.editFormUserName = true;
        $scope.editUserName = $scope.userName;
    };

    $scope.editUserNameCancel = function() {
        $scope.editFormUserName = false;
    };

    $scope.editUserNameSave = function() {
        $scope.userName = $scope.editUserName;
        $scope.editUserNameCancel();
    };



    




    $scope.userEmailAddress = "hi@dsadsh.com";
    $scope.editFormUserEmailAddr = false;

    $scope.userUserEmailAddrEdit = function() {
        $scope.editFormUserEmailAddr = true;
        $scope.editUserEmailAddr = $scope.userEmailAddress;
    };

    $scope.editUserEmailAddrCancel = function() {
        $scope.editFormUserEmailAddr = false;
    };

    $scope.editUserEmailAddrSave = function() {
        $scope.userEmailAddress = $scope.editUserEmailAddr;
        $scope.editUserEmailAddrCancel();
    };

*/



/*

    

    $scope.getUserById($scope.globalUserId);

    console.log($scope.userParam)
*/


//   console.log($scope.getUserById($scope.globalUserId))

/*



<div>

<h1>{{account.Name}}</h1>

<span ng-show="mode == 'display'">

  <table class="table" style="width:50%">
    <tbody>
    <tr>
      <td width="20%">Type:</td>
      <td>{{account.Type}}</td>
    </tr>
    <tr>
      <td>State:</td>
      <td>{{account.BillingState}}</td>
    </tr>    
    <tr>
      <td></td>
      <td></td>
    </tr>      
    </tbody>
  </table>

  <button type="button" class="btn btn-primary" ng-click="edit(account)">Edit Account</button>
</span>

<span ng-show="mode == 'edit'">

  <form  name="editForm" ng-submit="update()">
    <fieldset>
    <legend>Edit Account</legend>

    <label>Account name</label>
    <input type="text" ng-model="account.Name" required><br/>

    <label>Type</label>
    <input type="text" ng-model="account.Type" required><br/>

    <button type="submit" class="btn btn-primary">Submit</button> 
    <button type="button" class="btn"  ng-click="cancel()">Cancel</button>

    </fieldset>
  </form>

</span>

</div>





*/


/*

<div>
    <div ng-hide="editFormEnabled">
        
        <a href="" ng-click="userNameEdit()">Edit</a>
    </div>
    <div ng-show="editFormEnabled">
        <input ng-model="editUserName" ng-show="editFormEnabled">
        <a href="" ng-click="userNameSave()">Save</a>
        or
        <a href="" ng-click="editFormCancel()">cancel</a>.
    </div>
</div>


*/



  //'AccountDetailCtrl', function($scope, $routeParams, Account) {
/*
  $scope.account = Account.get({id:$routeParams.id});
  $scope.mode = 'display';

  $scope.edit = function() {
    $scope.mode = 'edit';
  }

  $scope.cancel = function() {
    $scope.mode = 'display';
  }

  $scope.update = function() {
    $scope.mode = 'display';
    Account.update({id:$routeParams.id}, $scope.account, function() {
      // performs some operation when the callback completes like error checking
      console.log('Callback completed!');
    });

  }
*/

};
