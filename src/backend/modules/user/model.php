<?php

class UserModel extends Model {
    public function signin(UserSignin $user) {
        $result = $this->db->query(
            'CALL userSignin(?, ?)',
            'ss',
            $user->email,
            $user->password
        );
        return $result[0]['user_id'];
    }
    public function signup(UserSignup $user) {
        $result = $this->db->query(
            'CALL userSignup(?, ?, ?)',
            'sss',
            $user->email,
            $user->username,
            $user->password
        );
        return $result[0]['user_id'];
    }
    public function social_signin($user) {
        $result = $this->db->query(
            'CALL userSocialSignin(?)',
            's',
            $user->email
        );
        return $result[0]['user_id'];
    }
    public function get_user($uid) : User {
        $result = $this->db->query(
            'SELECT * FROM users WHERE user_id = ?',
            's',
            $uid
        )[0];
        $result['password'] = '';
        $result['username'] = $result['username'] ?? '';
        $user = new User();
        Utils\array_to_obj($result, $user);
        return $user;
    }

    public function verify_email($email) {
        $this->db->query(
            'UPDATE users SET verified = 1 WHERE email = ?',
            's',
            $email
        );
    }

    public function email_exists($email) {
        return $this->db->query(
            'SELECT EXISTS(SELECT * FROM users WHERE email = ?) AS email_exists',
            's',
            $email
        )[0];
    }

    public function change_password($email, $new_password) {
        $this->db->query(
            'CALL userChangePassword(?, ?)',
            'ss',
            $email,
            $new_password
        );
    }

}

?>
