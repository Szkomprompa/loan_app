package pamiw.eepw.loanmanager.security.password;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

@NoArgsConstructor
@Slf4j
public class CustomPasswordEncoder implements PasswordEncoder {

    private static final int SALT_LENGTH = 8;
    private static final int STRETCHING_ITERATIONS = 10000;

    @Value("${constants.pepper}")
    private String pepper;

    @Override
    public String encode(CharSequence rawPassword) {
        ByteBuffer salt = generateSalt();

        return preparePassword(rawPassword, salt);
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        ByteBuffer decodedPassword = ByteBuffer.wrap(Base64.getDecoder().decode(encodedPassword));
        byte[] saltBytes = new byte[SALT_LENGTH];
        decodedPassword.get(saltBytes);
        ByteBuffer salt = ByteBuffer.wrap(saltBytes);

        String generatedEncodedPassword = preparePassword(rawPassword, salt);

        return generatedEncodedPassword.equals(encodedPassword);
    }

    private String preparePassword(CharSequence rawPassword, ByteBuffer salt) {
        ByteBuffer bytesOfPepper = ByteBuffer.wrap(pepper.getBytes(StandardCharsets.UTF_8));
        ByteBuffer bytesOfPassword = ByteBuffer.wrap(rawPassword.toString().getBytes(StandardCharsets.UTF_8));

        ByteBuffer pepperedPassword = addSaltAndPepper(salt, bytesOfPassword, bytesOfPepper);
        ByteBuffer hashedPassword = hashPassword(pepperedPassword);
        ByteBuffer password = addSalt(salt, hashedPassword);

        Base64.Encoder encoder = Base64.getEncoder();

        return encoder.encodeToString(password.array());
    }

    private static ByteBuffer hashPassword(ByteBuffer password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.reset();

            byte[] stretchedHash = digest.digest(password.array());

            for (int i = 0; i < STRETCHING_ITERATIONS - 1; i++) {
                digest.reset();
                stretchedHash = digest.digest(stretchedHash);
            }

            return ByteBuffer.wrap(stretchedHash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Algorithm not available", e);
        }
    }

    private static ByteBuffer generateSalt() {
        byte[] salt = new byte[SALT_LENGTH];
        new SecureRandom().nextBytes(salt);
        return ByteBuffer.wrap(salt);
    }

    private static ByteBuffer addSaltAndPepper(ByteBuffer salt, ByteBuffer password, ByteBuffer pepper) {
        ByteBuffer buffer = ByteBuffer.allocate(salt.capacity() + password.capacity() + pepper.capacity());

        buffer.put(salt.array());
        buffer.put(password.array());
        buffer.put(pepper.array());

        return buffer;
    }

    private static ByteBuffer addSalt(ByteBuffer salt, ByteBuffer password) {
        ByteBuffer buffer = ByteBuffer.allocate(salt.capacity() + password.capacity());

        buffer.put(salt.array());
        buffer.put(password.array());

        return buffer;
    }
}
