exports.init = async (client) => {
    await client.query(`
    CREATE TABLE IF NOT EXISTS metrics
    (
        id serial not null PRIMARY KEY, 
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        platform char(30) not null,
        fid float(4) not null,
        url varchar(255) not null,
        performance json not null
    );  
    `);
};

exports.collectData = async (client, data) => {
    const { platform, fid, url, performance } = data;
    return client.query(
        'INSERT INTO metrics (platform, fid, url, performance) VALUES($1, $2, $3, $4) RETURNING id',
        [platform, fid, url, performance]
    );
}
