CREATE PROCEDURE Parking.PersonLogin
    @plate VARCHAR(6),
    @stateCode CHAR(2)
AS
BEGIN
    IF EXISTS (
        SELECT * FROM Parking.People P WHERE P.LicensePlate = @plate AND P.StateCode = @stateCode;
    ) THEN
        RETURN 1;
    RETURN 0;
    
END

DROP PROCEDURE Parking.PersonLogin