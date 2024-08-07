package com.example.sdk.utils;

import cn.hutool.crypto.digest.DigestAlgorithm;
import cn.hutool.crypto.digest.Digester;
import cn.hutool.http.HttpRequest;

import java.util.HashMap;

/**
 * 签名工具
 *
 */
public class SignUtils {
    /**
     * 生成签名算法，确保数据在传输过程中没有被篡改或者被冒充
//     *  @param method 请求方法（例如 GET/POST）
     * @param body 请求体，GET请求时可以为空
     * @param secretKey 密钥
     * @param nonce 随机数（防重放攻击）
     * @param timestamp 时间戳（防止过期）
     * @return 生成的签名
     */
    public static String genSign(String body, String nonce, String timestamp, String secretKey) {
        // 创建 SHA256 的消息摘要器
        Digester md5 = new Digester(DigestAlgorithm.SHA256);
        // 将请求体和密钥拼接起来以生成待签名的内容
        String content =   body + nonce + timestamp + secretKey; //null拼接字符串会转
        // 使用消息摘要器计算内容的哈希值，并以十六进制形式返回
        return md5.digestHex(content);
    }

    /**
     * 生成签名算法，确保数据在传输过程中没有被篡改或者被冒充
     * @param headers Request Header
     * @param secretKey 密钥
     * @return 生成的签名
     */
    public static String genSign(HashMap<String, String> headers, String body, String secretKey) {
        String nonce = headers.get("nonce");
        String timestamp = headers.get("timestamp");
        return genSign(body, nonce, timestamp, secretKey);
    }
}
