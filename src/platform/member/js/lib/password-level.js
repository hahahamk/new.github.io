var checkPassword = {
	aResultSecure : [],
	sPassword : '',

	sCheckRegexp1 : /^[a-zA-Z]/,
	sCheckRegexp2 : /[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\?\(\)\_\+\{\}\[\]]/,

	sRegexp1 : /[a-z]/,
	sRegexp2 : /[A-Z]/,
	sRegexp3 : /[0-9]/,
	sRegexp4 : /[\~\!\@\#\$\%\^\&\*\?\(\)\_\+\{\}\[\]]/, 

	main : function(sPassword) {
		this.aResultSecure['code'] = 0;
		this.aResultSecure['msg'] = false;
		this.sPassword = sPassword;
		this.sResultRegexp = this.checkRegexp();

		// 기본 검사
		if (this.checkDefaultPassword() == true) {
			// 낮은 단계 비밀번호 검사
			// 영어 또는 숫자로만 이루어진 6자리이상 비밀번호
			// return 1
			this.checkPasswordLevel1();

			// 중간 단계단계 비밀번호 검사
			// 영어, 숫자 2가지 조합으로 6자리 이상
			// 영어, 숫자, 특수문자 혼용으로 8자리 미만
			// return 2
			this.checkPasswordLevel2();

			// 높은 단계 비밀번호 검사검사 
			// 영어, 숫자 2가지 조합으로 14자리 이상
			// 문자그룹 중에서 특수문자 포함 3가지 이상 조합하여 8자리 이상
			// return 3
			this.checkPasswordLevel3();

			if (this.aResultSecure['code'] == 0) {
				this.aResultSecure['code'] = 1000;
				this.aResultSecure['msg'] = '영문+숫자, 혹은 영문+특수문자 등 비밀번호를 조합하여 입력해 주세요.';
			}
		}

		return this.aResultSecure;
	},

	// 사용된 문자 확인.
	checkRegexp : function() {
		var rStr = '';
		
		if (this.sRegexp1.test(this.sPassword)) { // 소문자 사용
			rStr += '1';
		}
		
		if (this.sRegexp2.test(this.sPassword)) { // 대문자 사용
			rStr += '2';
		}
		
		if (this.sRegexp3.test(this.sPassword)) { // 숫자 사용
			rStr += '3';
		}
		
		if (this.sRegexp4.test(this.sPassword)) { // 특수 문자 사용
			rStr += '4';
		}

		return rStr;
	},

	// 기본 비밀번호 조건 확인
	checkDefaultPassword : function() {
		if (this.sCheckRegexp1.test(this.sPassword)) {
			var sTemp = '';
			
			for (var x= 0; x < this.sPassword.length; x++) {
				sTemp = this.sPassword.substr((x*1),1);
				if (!this.sCheckRegexp2.test(sTemp)) {
					this.aResultSecure['code'] = 2000;
					this.aResultSecure['msg'] = '['+sTemp+']는 사용 불가능한 특수문자입니다.';
					return false; 
				}
			}
		}

		if (this.sPassword.length < 8) {
			this.aResultSecure['code'] = 3000;
			this.aResultSecure['msg'] = '비밀번호를 8자 이상 입력해 주세요.';
			return false;
		}
		
		return true;
	},

	// 낮은 단계 비밀번호 검사
	// 영어 또는 숫자로만 이루어진 6자리이상 비밀번호
	// return 1
	checkPasswordLevel1 : function() {
		if (this.sPassword.length >= 6 && this.sPassword.length < 8) {
			if (this.sResultRegexp.length == 2) { // 두가지 조합
				this.aResultSecure['code'] = 1;
			}
		}
	},

	// 중간 단계단계 비밀번호 검사
	// 영어, 숫자 2가지 조합으로 6자리 이상
	// 영어, 숫자, 특수문자 혼용으로 8자리 미만
	// return 2
	checkPasswordLevel2 : function() {
		if (this.sPassword.length >= 6 && this.sPassword.length < 14) {
			if (this.sResultRegexp.length == 2) {
				this.aResultSecure['code'] = 2;
			}
		}

		if (this.sPassword.length >= 6) {
			if (this.sResultRegexp == '123') {
				this.aResultSecure['code'] = 2;
			}
		}
	},

	// 높은 단계 비밀번호 검사검사 
	// 영어, 숫자 2가지 조합으로 14자리 이상
	// 문자그룹 중에서 특수문자 포함 3가지 이상 조합하여 8자리 이상
	// return 3
	checkPasswordLevel3 : function() {
		if (this.sPassword.length >= 14) {
			if (this.sResultRegexp.length >= 2) { // 두가지 조합에 14자리 이상
				this.aResultSecure['code'] = 3;
			}
		}

		if (this.sPassword.length >= 8) {
			if (this.sResultRegexp == '123') { // 세가지 이상 조합 (특수문자 제외). 
				this.aResultSecure['code'] = 3;
			}
		}

		if (this.sPassword.length >= 8) {
			if (this.sResultRegexp.length >= 2 && this.sResultRegexp.indexOf('4') > -1) { // 세가지 이상 조합, 특수문자 포함
				this.aResultSecure['code'] = 3;
			}
		}
	}
}