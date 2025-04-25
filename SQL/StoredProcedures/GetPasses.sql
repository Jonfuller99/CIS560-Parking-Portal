DROP PROCEDURE IF EXISTS Parking.GetPasses;

GO

CREATE PROCEDURE Parking.GetPasses
    @PersonID INT
AS
BEGIN

    SELECT PTY.PassType
    FROM Parking.Passes P
    JOIN Parking.PassTypeYears PTY ON PTY.PassTypeYearID = P.PassTypeYearID
    WHERE P.PersonID = @PersonID
        AND PTY.YearOfValidity = YEAR(SYSDATETIME());
END

GO