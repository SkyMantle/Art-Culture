# Sample Database Data

The SQL dumps used for local development are not stored in this repository. To obtain the sample data:

1. Download `dump.sql` and `testdata.sql` from the project release page or request them from the maintainers.
2. Place the files in the project root directory.
3. Import them into your PostgreSQL database:
   ```bash
   psql -U <user> -d <database> -f dump.sql
   psql -U <user> -d <database> -f testdata.sql
   ```

These files are ignored by Git once added to your working directory.
