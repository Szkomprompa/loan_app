package pamiw.eepw.loanmanager.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.nio.ByteBuffer;

public class CustomPasswordEncoder implements PasswordEncoder {

    @Value("${constants.pepper}")
    private String pepper;

    @Override
    public String encode(CharSequence rawPassword) {
        return null;
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return false;
    }

    private static ByteBuffer hashPassword(final CharSequence password) {
        return null;
    }

    private static ByteBuffer generateSalt() {
        return null;
    }
}
