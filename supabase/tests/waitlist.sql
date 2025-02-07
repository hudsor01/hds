-- Test waitlist signup
DO $$
DECLARE
    v_user1_id uuid;
    v_user2_id uuid;
    v_waitlist_id1 uuid;
    v_waitlist_id2 uuid;
BEGIN
    -- Test 1: Basic waitlist entry creation
    INSERT INTO waitlist (email, name)
    VALUES ('test1@example.com', 'Test User 1')
    RETURNING id INTO v_waitlist_id1;

    ASSERT (
        SELECT position
        FROM waitlist
        WHERE id = v_waitlist_id1
    ) = 1, 'First user should have position 1';

    -- Test 2: Referral system
    INSERT INTO waitlist (email, name, referred_by)
    VALUES ('test2@example.com', 'Test User 2', 'test1@example.com')
    RETURNING id INTO v_waitlist_id2;

    ASSERT (
        SELECT referral_code
        FROM waitlist
        WHERE id = v_waitlist_id2
    ) IS NOT NULL, 'Referral code should be generated';

    -- Test 3: Position updates
    UPDATE waitlist
    SET status = 'invited'
    WHERE id = v_waitlist_id1;

    ASSERT (
        SELECT position
        FROM waitlist
        WHERE id = v_waitlist_id2
    ) = 1, 'Second user should move to position 1 after first user is invited';

    -- Test 4: Event logging
    ASSERT (
        SELECT COUNT(*)
        FROM waitlist_events
        WHERE waitlist_id = v_waitlist_id1
    ) > 0, 'Events should be logged for status change';

    -- Test 5: RLS Policies
    -- Note: These need to be tested with different auth contexts
    -- Test anonymous insert
    INSERT INTO waitlist (email, name)
    VALUES ('test3@example.com', 'Test User 3');

    -- Test admin update
    SET ROLE postgres;
    UPDATE waitlist SET status = 'invited' WHERE email = 'test3@example.com';
    RESET ROLE;

    -- Cleanup
    DELETE FROM waitlist_events WHERE waitlist_id IN (v_waitlist_id1, v_waitlist_id2);
    DELETE FROM waitlist WHERE id IN (v_waitlist_id1, v_waitlist_id2);
    DELETE FROM waitlist WHERE email = 'test3@example.com';

    RAISE NOTICE 'All tests passed successfully!';
END;
$$;
