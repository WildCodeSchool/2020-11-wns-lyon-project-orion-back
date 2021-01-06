import * as bcrypt from 'bcrypt';

export async function hash(
    password: string,
    saltRounds: number = 10,
): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

export async function compare(
    password: string,
    hash: string,
): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
